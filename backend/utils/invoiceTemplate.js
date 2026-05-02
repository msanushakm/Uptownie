const invoiceTemplate = (order, productDetails, total) => {

  const subtotal = total;
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  return `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 30px;
        color: #333;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .logo {
        font-size: 32px;
        font-weight: bold;
        color: #0b0b0b;
      }

      .company {
        text-align: right;
        font-size: 12px;
        line-height: 1.6;
      }

      hr {
        margin: 15px 0;
      }

      h2 {
        margin-top: 10px;
      }

      .flex {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
      }

      .section {
        font-size: 13px;
        line-height: 1.6;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        font-size: 12px;
        text-align: center;
      }

      th {
        background: #f2f2f2;
      }

      .totals {
        margin-top: 20px;
        text-align: right;
        font-size: 13px;
      }

      .grand {
        margin-top: 10px;
        font-weight: bold;
        background: #f2f2f2;
        padding: 10px;
        display: inline-block;
      }

      .footer {
        margin-top: 40px;
        text-align: center;
        font-size: 12px;
      }
    </style>
  </head>

  <body>

    <div class="header">
      <div class="logo">UPTOWNIE</div>

      <div class="company">
        <b>Corporate Office:</b><br/>
        Uptownie Fashion<br/>
        6, Alipore Avenue, Kala Bagan, Alipore, 
        Kolkata, West Bengal 700027<br/>
        India<br/>
        CIN: U74900KA2024PTC123456
      </div>
    </div>

    <hr/>

    <h2>OFFICIAL RECEIPT</h2>

    <div class="flex section">
      <div>
        <p><b>Invoice #:</b> INV-${order._id}</p>
        <p><b>Order ID:</b> ${order._id}</p>
        <p><b>Date:</b> ${new Date(order.date).toLocaleDateString()}</p>
        <p><b>Payment:</b> ${order.payment}</p>
        <p><b>Status:</b> ${order.status}</p>
      </div>

      <div>
        <p><b>Shipping:</b> Standard Delivery</p>
        <p><b>Estimated:</b> 3–5 Days</p>
        <p><b>Shipping Cost:</b> FREE</p>
        <p><b>GSTIN:</b> 29ABCDE1234F1Z5</p>
        <p><b>Support:</b> support@uptownie.com</p>
        <p><b>Phone:</b>+91 97118 87220</p>
      </div>
    </div>

    <div class="section" style="margin-top:20px;">
      <b>Billed To:</b><br/>
      ${order.address.name}<br/>
      ${order.address.address}<br/>
      ${order.address.city}, ${order.address.state} - ${order.address.pincode}
    </div>

    <table>
      <tr>
        <th>Item</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Base</th>
        <th>CGST</th>
        <th>SGST</th>
        <th>Total</th>
      </tr>

      ${productDetails.map(item => {
        const base = item.price / 1.18;
        const cgst = base * 0.09;
        const sgst = base * 0.09;

        return `
          <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price}</td>
            <td>₹${base.toFixed(2)}</td>
            <td>₹${cgst.toFixed(2)}</td>
            <td>₹${sgst.toFixed(2)}</td>
            <td>₹${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        `;
      }).join("")}
    </table>

    <div class="totals">
      <p>Taxable Subtotal: ₹${subtotal.toFixed(2)}</p>
      <p>Total Tax (GST 18%): ₹${gst.toFixed(2)}</p>
      <p>Shipping: FREE</p>

      <div class="grand">
        Grand Total: ₹${grandTotal.toFixed(2)}
      </div>
    </div>

    <div class="footer">
      Thank you for shopping with Uptownie!
    </div>

  </body>
  </html>
  `;
};

module.exports = invoiceTemplate;