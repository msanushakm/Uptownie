import Register from "./components/Register"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Password from "./components/Password"
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from "./components/Home"
import About from "./components/About"
import Footer from "./components/Footer";
import Admin from "./components/adminPage/Admin";
import AddProduct from "./components/adminPage/AddProduct";
import ShirtCards from "./components/adminPage/ShirtCards";
import SkirtCards from "./components/adminPage/SkirtCards";
import ManageProduct from "./components/adminPage/ManageProduct";
import UpdateProduct from "./components/adminPage/UpdateProduct";
import AddToCart from "./components/adminPage/AddToCart";
import Checkout from "./components/adminPage/Checkout";
import Payment from "./components/adminPage/Payment";
import ManageOrder from "./components/adminPage/ManageOrder";
import ProductDetails from "./components/adminPage/ProductDetails";
import DressCards from "./components/adminPage/DressCards";
import TopCards from "./components/adminPage/TopCards";
import WinterCards from "./components/adminPage/WinterCards";
import SwimCards from "./components/adminPage/SwimCards";
import CoordCards from "./components/adminPage/CoordCards";
import LovedCards from "./components/adminPage/LovedCards";
import NewinCards from "./components/adminPage/NewinCards";
import ThreeComboCards from "./components/adminPage/ThreeComboCards";
import TwoJeansCards from "./components/adminPage/TwoJeansCards";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ResetPassword from "./components/ResetPassword";
import MyProfile from "./components/MyProfile";
import MyOrders from "./components/MyOrder";
import ViewProduct from "./components/ViewProduct";
import AdminLayout from "./components/adminPage/AdminLayout";
function Layout() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
  <Route path="/" element={<Home/>} />
  <Route path='/login' element={<Login/>} />
  <Route path='/register' element={<Register/>} />
  <Route path='/forgotpw' element={<Password/>} />
  <Route path="/reset-password/:email" element={<ResetPassword />} />
  <Route path='/about' element={<About/>} />
  <Route path='/shirtCards' element={<ShirtCards/>} />
  <Route path='/skirtCards' element={<SkirtCards/>}/>
  <Route path='/dressCards' element={<DressCards/>}/>
  <Route path='/topCards' element={<TopCards/>}/>
  <Route path='/winterCards' element={<WinterCards/>}/>
  <Route path='/swimCards' element={<SwimCards/>}/>
  <Route path='/coordCards' element={<CoordCards/>}/>
  <Route path='/lovedCards' element={<LovedCards/>}/>
  <Route path='/newinCards' element={<NewinCards/>}/> 
  <Route path='/threeComboCards' element={<ThreeComboCards/>}/> 
  <Route path='/twoJeansCards' element={<TwoJeansCards/>}/>      
  <Route path='/productDetails/:id' element={<ProductDetails/>} />

  <Route element={<ProtectedRoutes userOnly={true}/>}>
    <Route path='/addtocart' element={<AddToCart/>} />
    <Route path='/checkout' element={<Checkout/>}/>
    <Route path='/payment' element={<Payment/>}/>
    <Route path="/myProfile" element={<MyProfile/>}></Route>
    <Route path='/myOrders' element={<MyOrders/>}></Route>
    <Route path="/viewProduct/:id" element={<ViewProduct/>} />
  </Route>

  <Route element={<ProtectedRoutes adminOnly={true} />}>

  <Route path="/admin" element={<AdminLayout />}>

    <Route index element={<Admin />} />
    <Route path="addProduct" element={<AddProduct />} />
    <Route path="manageProduct" element={<ManageProduct />} />
    <Route path="manageOrder" element={<ManageOrder />} />
    <Route path="updateProduct/:id" element={<UpdateProduct />} />

  </Route>

</Route>
</Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;