require("dotenv").config();
const cors=require('cors')
const express=require("express")
const mongoose=require('mongoose')
const multer=require('multer')
const path = require("path");
const fs=require('fs')
const UptownieModel=require('./models/user')
const Product = require("./models/product")
const Order = require("./models/order")
const sendEmail = require("./utils/sendEmail");
const Razorpay = require("razorpay");
const PDFDocument = require("pdfkit");
const puppeteer = require("puppeteer");
const chromeLauncher = require("chrome-launcher");
const generateInvoice = require("./utils/generateInvoice");
const app=express()
const allowedOrigins = [
  "http://localhost:5173",
  "https://uptownie-frontend.onrender.com"
];

const {v2:cloudinary}=require("cloudinary");
const {CloudinaryStorage}=require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
});
const storage=new CloudinaryStorage({
  cloudinary:cloudinary,
  params:{
    folder:"products",
  },
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Connecetd to MongoDB Atlas"))
.catch(err=>console.log(err));

app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    UptownieModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password===password){
                res.json({
                    status:"success",
                    role:user.role,
                    firstName: user.firstName,
                    secondName: user.secondName,
                    email: user.email
                })
               
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json('No record existed')
        }
    })

})

app.post('/register',(req,res)=>{
    UptownieModel.create(req.body)
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})

const upload = multer({ storage });

app.post("/addProduct", upload.single("image"), async(req,res)=>{

 const product = new Product({
   name:req.body.name,
   price:req.body.price,
   description:req.body.description,
   category: req.body.category,
   image:req.file.path
 })

 await product.save()

 res.json("Product Added")
})

app.get("/products", async(req,res)=>{
    const products = await Product.find()
    res.json(products)
})

app.get("/products/category/:category", async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category })
        res.json(products)
    } catch (err) {
        res.status(500).json(err)
    }
})

app.delete('/deleteProduct/:id',(req,res)=>{
    const id=req.params.id;
    Product.findByIdAndDelete({_id:id})
    .then(res=>res.json(res))
    .catch(err=>res.json(err))
})

app.get("/products/:id", async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        
        if(!product){
            return res.json(err)
        }
        res.json(product)
    }
    catch(err){
        res.json(err)
    }
})

app.put('/updateProduct/:id',upload.single('image'),async(req,res)=>{
    try{
        const {name,price,description}=req.body;
        const updateData={name,price,description};

        if(req.file){
            updateData.image=req.file.path;
        }
        const updated=await Product.findByIdAndUpdate(req.params.id,updateData,{
            new:true,
        });
        res.json(updated);
    }
    catch(err){
        console.log(err)
    }
})

app.post("/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    const productDetails = await Promise.all(
      req.body.cart.map(async (item) => {
        const product = await Product.findById(item.productId);

        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        return {
          name: product.name,
          quantity: item.quantity,
          price: product.price
        };
      })
    );

    let total = 0;
    productDetails.forEach((item) => {
      total += item.price * item.quantity;
    });

    let pdfBuffer = null;

    try {
      pdfBuffer = await generateInvoice(newOrder, productDetails, total);
      console.log("PDF LENGTH:", pdfBuffer?.length);
    } catch (err) {
      console.error("PDF ERROR:", err);
    }

    try {
      await sendEmail(
        req.body.address.email,
        "Order Confirmed",
        `
        <h2>Order Confirmed</h2>
        <p><b>Order ID:</b> ${newOrder._id}</p>
        <p><b>Total:</b> ₹${total}</p>
        `,
        pdfBuffer && pdfBuffer.length > 0
        ? { content: pdfBuffer }
        : null
      );
    } catch (err) {
      console.error("EMAIL ERROR:", err);
    }

    res.status(201).json({
      message: "Order placed successfully",
    });

  } catch (err) {
    console.error("FULL ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

app.get("/orders", async(req,res)=>{
    const orders = await Order.find()
    res.json(orders)
})

app.get("/orders/:id", async (req, res) => {
    try {
        console.log("Incoming userId:", req.params.id);
        const userId = req.params.id;
        const orders = await Order.find({ userId: userId });
        res.json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.delete('/deleteOrders/:id',(req,res)=>{
    const id=req.params.id;
    Order.findByIdAndDelete({_id:id})
    .then(res=>res.json(res))
    .catch(err=>res.json(err))
})

app.put("/orders/:id", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (req.body.status === "Shipped") {
            await sendEmail(
                updatedOrder.address.email,
                "Order Shipped",
                `
                <h2>Your Order is Shipped.</h2>
                <p>Order ID: ${updatedOrder._id}</p>
                `
            );
        }

        if (req.body.status === "Delivered") {
            await sendEmail(
                updatedOrder.address.email,
                "Order Delivered",
                `
                <h2>Your Order Delivered.</h2>
                <p>Order ID: ${updatedOrder._id}</p>
                <p>Thank you for shopping with us!</p>
                `
            );
        }
        res.json(updatedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update order" });
    }
});

app.get("/products/search/:category/:key", async (req, res) => {
    try {
        const { category, key } = req.params;
        const result = await Product.find({
            category: category,
            $or: [
                { name: { $regex: key, $options: "i" } },
                { description: { $regex: key, $options: "i" } },
            ],
        });

        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret:process.env.RAZORPAY_API_SECRET
});

app.post("/create-order", async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);

        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Order creation failed" });
    }
});

const crypto = require("crypto");

app.post("/verify-payment", (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ status: "success" });
    } else {
      res.json({ status: "failure" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error" });
  }
});

app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ status: "error", message: "Email required" });
    }
    const user = await UptownieModel.findOne({ email });

    if (!user) {
      return res.json({ status: "error" });
    }
    res.json({ status: "success" });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ status: "error" });
  }
});

app.post("/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;
    await UptownieModel.findOneAndUpdate(
      { email },
      { password }
    );
    res.json({ status: "success" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error" });
  }
});

app.get("/viewProduct/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

app.listen(3001,()=>{
    console.log("server is running")
})
