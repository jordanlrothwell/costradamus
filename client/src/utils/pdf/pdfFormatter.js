const PDFDocument = require("pdfkit");
const fs = require("fs");

var doc = new PDFDocument();

doc.pipe(fs.createWriteStream("output.pdf"));

const testItems = [
  {
    itemNumber: 1,
    description:
      "Claim for debt, liquidated demand or claim arising from a motor vehicle accident for costs of repairs only or for total loss of vehicle only including all professional costs.",
    special: {
      rate: null,
      amount: null,
    },
    category: "Claim",
    scale: {
      A: 232,
      B: 486,
      C: 596,
      D: 718,
      E: 891,
      F: 1073,
      G: 1282,
    },
  },
  {
    itemNumber: 2,
    description:
      "Instructions to make, issue or oppose an application or summons or any notice of objection under the Judgment Debt Recovery Act 1984 including instructions for any affidavit (not otherwise provided for).",
    special: {
      rate: null,
      amount: null,
    },
    category: "Instructions",
    scale: {
      A: 80,
      B: 80,
      C: 80,
      D: 119,
      E: 151,
      F: 178,
      G: 208,
    },
  },
  {
    itemNumber: 3,
    description:
      "Complaint, including instructions to sue, letter before action, attendances on counsel, copies for service, issuing, and attendances on process server.",
    special: {
      rate: null,
      amount: null,
    },
    category: "Institution of proceedings",
    scale: {
      A: 232,
      B: 487,
      C: 597,
      D: 719,
      E: 892,
      F: 1075,
      G: 1285,
    },
  },
];

const formatConstants = {
  logo: [50, 50],
  address: [450, 50],
  header: [50, 150],
  reference: [380, 200],
  items: [50, 255],
};

//TODO: make sure logo works here
doc
  .save()
  .moveTo(50, 50)
  .lineTo(50, 100)
  .lineTo(200, 100)
  .lineTo(200, 50)
  .fill("#000000");

function address(firm, ABN, addr1, addr2, addr3) {
  const [x, y] = formatConstants.address;

  doc.fontSize(8).text(firm, x, y);
  doc.fontSize(8).text(ABN, x, y + 10);
  doc.fontSize(8).text(addr1, x, y + 30);
  doc.fontSize(8).text(addr2, x, y + 40);
  doc.fontSize(8).text(addr3, x, y + 50);
}

function header() {
  const [x, y] = formatConstants.header;

  doc.path(`M ${x} ${y} L ${x + 500} ${y}`).stroke();
  doc.fontSize(10).text("TAX INVOICE", x, y + 10, { align: "center" });
  doc.path(`M ${x} ${y + 25} L ${x + 500} ${y + 25}`).stroke();
}

function reference(ref, date, invNo) {
  const [x, y] = formatConstants.reference;

  doc.fontSize(10).text("Reference:", x, y);
  doc.fontSize(10).text(ref, x + 70, y);
  doc.fontSize(10).text("Date:", x, y + 13);
  doc.fontSize(10).text(date, x + 70, y + 13);
  doc.fontSize(10).text("Invoice No:", x, y + 26);
  doc.fontSize(10).text(invNo, x + 70, y + 26);
}

function generateRow(x, y, currentItem, quantum) {
  // helper function to grab correct scale value based on quantum
  function getScale(item, quantum) {
    if (quantum < 500) {
      return item.scale.A;
    }
    if (500 < quantum && quantum < 5000) {
      return item.scale.B;
    }
    if (5000 <= quantum && quantum < 7500) {
      return item.scale.C;
    }
    if (7500 <= quantum && quantum < 20000) {
      return item.scale.D;
    }
    if (20000 <= quantum && quantum < 40000) {
      return item.scale.E;
    }
    if (40000 <= quantum && quantum < 70000) {
      return item.scale.F;
    }
    if (70000 <= quantum) {
      return item.scale.G;
    }
  }

  const amount = getScale(currentItem, quantum);

  // helper function to format the scale value as a string
  function currencyFormatter(value) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

    return formatter.format(value);
  }

  const amountString = currencyFormatter(amount);

  doc
    .fontSize(10)
    .text(currentItem.itemNumber, x, y, { align: "left" })
    .text(currentItem.description, x + 70, y, { width: 300, align: "left" })
    .text(amountString, x + 420, y, { align: "left" });
}

function generateTable(items, quantum) {
  const [x, y] = formatConstants.items;

  doc
    .fontSize(10)
    .text("Item", x, y, { align: "left" })
    .text("Description", x + 70, y, { width: 300, align: "left" })
    .text("Amount", x + 420, y, { align: "left" });

  doc.path(`M ${x} ${y + 15} L ${x + 500} ${y + 15}`).stroke();

  let currentY = y + 25;

  for (let i = 0; i < items.length; i++) {
    generateRow(x, currentY, items[i], quantum);
    currentY += 50;
  }
}

address(
  "Costradamus Law",
  "ABN: 51 496 096 744",
  "PO Box 13025",
  "24 Market Street",
  "MELBOURNE VIC 3700"
);
header();
reference("Johnson v Smith", "14 May 2022", "115951554  01");
generateTable(testItems, 1500);

doc.path("M 365 420 L 550 420").stroke();
doc.fontSize(10).text("GST", 365, 435);

doc.fontSize(10).text("$1,450.00", 470, 435, { align: "left" });

doc.fontSize(10).text("TOTAL (Incl. GST)", 365, 460);

doc.fontSize(10).text("$14,550.00", 470, 460, { align: "left" });

doc.path("M 365 480 L 550 480").stroke();

doc.end();
