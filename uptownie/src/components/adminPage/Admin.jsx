import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
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

      const orderData = orderRes.data;
      const productData = productRes.data;

      setOrders(orderData);
      setProducts(productData);

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

      </div>

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

    </div>
  );
}

export default Admin;