const puppeteer = require("puppeteer");
const invoiceTemplate = require("./invoiceTemplate");

const generateInvoice = async (order, productDetails, total) => {
  try {
    const html = invoiceTemplate(order, productDetails, total);

    const browser = await puppeteer.launch({
      headless: true,
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
      ],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return pdfBuffer;

  } catch (err) {
    console.error("PDF ERROR:", err);
    return null;
  }
};

module.exports = generateInvoice;