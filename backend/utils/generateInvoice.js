const puppeteer = require("puppeteer");
const invoiceTemplate = require("./invoiceTemplate");

const generateInvoice = async (order, productDetails, total) => {
  const html = invoiceTemplate(order, productDetails, total);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "domcontentloaded" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true
  });

  await browser.close();

  return pdfBuffer;
};

module.exports = generateInvoice;