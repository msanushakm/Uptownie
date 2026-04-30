const puppeteer = require("puppeteer");
const invoiceTemplate = require("./invoiceTemplate");

const generateInvoice = async (order, productDetails, total) => {
  try {
    const html = invoiceTemplate(order, productDetails, total);

    const isProduction = process.env.NODE_ENV === "production";

    const browser = await puppeteer.launch(
    isProduction
        ? {
            headless: true,
            args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            ],
        }
        : {
            headless: true,
            executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        }
    );

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