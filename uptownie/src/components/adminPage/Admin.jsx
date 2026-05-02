import { useEffect, useState } from "react";
import axios from "axios";
import {LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer,} from "recharts";
import {BarChart,Bar,PieChart,Pie,Cell,Legend,  AreaChart,Area,} from "recharts";
function Admin() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [gst, setGst] = useState(0);

  const BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3001"
      : "https://uptownie.onrender.com";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const orderRes = await axios.get(`${BASE_URL}/orders`);
      const productRes = await axios.get(`${BASE_URL}/products`);
      const userRes=await axios.get(`${BASE_URL}/users`);

      const orderData = orderRes.data;
      const productData = productRes.data;
      const userData=userRes.data;

      setOrders(orderData);
      setProducts(productData);
      setUsers(userData);

      const totalRevenue = orderData.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
      );

      setRevenue(totalRevenue);

      const gstAmount = (totalRevenue * 18) / 118;
      setGst(gstAmount);

    } catch (err) {
      console.error("Dashboard Error:", err);
    }
  };

  const monthlyOrders = {};

  orders.forEach((order) => {
    if (!order.date) return;

    const date = new Date(order.date);
    const month = date.toLocaleString("default", { month: "short" });

    monthlyOrders[month] = (monthlyOrders[month] || 0) + 1;
  });

  const chartData = Object.keys(monthlyOrders).map((month) => ({
    month,
    orders: monthlyOrders[month],
  }));

  const categoryCount = {};

orders.forEach((order) => {
  if (!order.cart) return;

  order.cart.forEach((item) => {
    const product = products.find(
      (p) => p._id === item.productId
    );

    const category = product?.category || "Others";

    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });
});

  const categoryData = Object.keys(categoryCount).map((key) => ({
    category: key,
    count: categoryCount[key],
  }));

  const statusCount = {
  confirmed: 0,
  shipped: 0,
  delivered: 0,
  };

  orders.forEach((order) => {
    const status = order.status?.toLowerCase();

    if (statusCount[status] !== undefined) {
      statusCount[status]++;
    }
  });

  const statusData = [
    { name: "Confirmed", value: statusCount.confirmed },
    { name: "Shipped", value: statusCount.shipped },
    { name: "Delivered", value: statusCount.delivered },
  ];
  const COLORS = ["#518552", "#136ab0", "#ea9f2f"];

  const paymentCount = {
  cod: 0,
  razorpay: 0,
};

orders.forEach((order) => {
  const method = order.payment?.toLowerCase();

  if (method === "cod") paymentCount.cod++;
  else if (method === "online") paymentCount.razorpay++;
});

const paymentData = [
  { name: "COD", value: paymentCount.cod },
  { name: "Razorpay", value: paymentCount.razorpay },
];
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div className="cards">

        <div className="card">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <p>₹{revenue}</p>
        </div>

        <div className="card">
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>

        <div className="card">
          <h3>Total GST</h3>
          <p>₹{gst.toFixed(2)}</p>
        </div>
        
        <div className="card">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>
      </div>
      <div className="chart-box-main">
      <div className="chart-box">
        <h3>Order Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#000"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
      <h3>Order Status Distribution</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {statusData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    </div>

    <div className="chart-box-main">
      <div className="chart-box">
      <h3>Category-wise Orders</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={categoryData}  margin={{ top: 10, right: 20, left: 20, bottom: 45 }}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="category" angle={-70} textAnchor="end" interval={0} height={45}/>
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className="chart-box">
    <h3>Payment Distribution</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={paymentData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={100}
          label
        >
          {paymentData.map((entry, index) => (
            <Cell
              key={index}
              fill={["#e29625", "#4c8c4e"][index]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
    
    </div>
    </div>
  );
}

export default Admin;