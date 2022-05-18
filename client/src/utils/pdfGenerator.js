const pdfGenerator = (matterRef, items, quantum) => {

  const lineCount = function (itemNumber) {
    const oneLine = [12, 13, 15, 23, 35, 44, 52, 53, 57, 63, 64, 73, 75, 80];
    const twoLine = [
      4, 7, 9, 10, 16, 18, 20, 21, 22, 24, 26, 27, 28, 29, 30, 31, 32, 33, 37,
      42, 45, 47, 57.1, 65, 69, 71, 74,
    ];
    const threeLine = [1, 3, 6, 14, 17, 25, 29.1, 34, 36, 50, 66, 70];
    const fourLine = [2, 5, 19, 72];
    const fiveLine = [43];

    if (oneLine.includes(itemNumber)) {
      return 1;
    }
    if (twoLine.includes(itemNumber)) {
      return 2;
    }
    if (threeLine.includes(itemNumber)) {
      return 3;
    }
    if (fourLine.includes(itemNumber)) {
      return 4;
    }
    if (fiveLine.includes(itemNumber)) {
      return 5;
    }
  };

  const formatConstants = {
    logo: [50, 50],
    address: [450, 50],
    header: [50, 150],
    reference: [380, 200],
    items: [50, 255],
  };

  function address(firm, ABN, addr1, addr2, addr3) {

    return function addressFN(doc) {
      const [x, y] = formatConstants.address;

      doc.fontSize(8).text(firm, x, y);
      doc.fontSize(8).text(ABN, x, y + 10);
      doc.fontSize(8).text(addr1, x, y + 30);
      doc.fontSize(8).text(addr2, x, y + 40);
      doc.fontSize(8).text(addr3, x, y + 50);
    }

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

  // helper function to format the scale value as a string
  function currencyFormatter(value) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

    return formatter.format(value);
  }

  function generateRow(x, y, currentItem, quantum) {
    const amount = getScale(currentItem, quantum);
    const amountString = currencyFormatter(amount);
    doc
      .fontSize(10)
      .text(currentItem.itemNumber, x, y, { align: "left" })
      .text(currentItem.description, x + 70, y, { width: 300, align: "left" })
      .text(amountString, x + 420, y, { align: "left" });
  }

  function generateTable(items, quantum) {
    const [x, y] = formatConstants.items;
    let total = 0;
    doc
      .fontSize(10)
      .text("Item", x, y, { align: "left" })
      .text("Description", x + 70, y, { width: 300, align: "left" })
      .text("Amount", x + 420, y, { align: "left" });
    doc.path(`M ${x} ${y + 15} L ${x + 500} ${y + 15}`).stroke();
    let currentY = y + 30;
    let spacingCount = 0;
    for (let i = 0; i < items.length; i++) {
      if (spacingCount <= 350) {
        generateRow(x, currentY, items[i], quantum);
        let spacing = (lineCount(items[i].itemNumber) + 1.5) * 10;
        currentY += spacing;
        spacingCount += spacing;
      } else {
        doc.addPage();
        currentY = 100;
        spacingCount = 0;
        generateRow(x, currentY, items[i], quantum);
        let spacing = (lineCount(items[i].itemNumber) + 1.5) * 10;
        currentY += spacing;
        spacingCount += spacing;
      }
      total += getScale(items[i], quantum);
    }
    let GST = total * 0.1;
    let final = total + GST;
    let GSTString = currencyFormatter(GST);
    let finalString = currencyFormatter(final);
    doc.path(`M 365 ${currentY + 20} L 550 ${currentY + 20}`).stroke();
    doc.fontSize(10).text("GST", 365, currentY + 35, { align: "left" });
    doc.fontSize(10).text(GSTString, 470, currentY + 35, { align: "left" });
    doc
      .fontSize(10)
      .text("TOTAL (Incl. GST)", 365, currentY + 60, { align: "left" });
    doc.fontSize(10).text(finalString, 470, currentY + 60, { align: "left" });
    doc.path(`M 365 ${currentY + 80} L 550 ${currentY + 80}`).stroke();
  }
  
  address(
    "Costradamus Law",
    "ABN: 51 496 096 744",
    "PO Box 13025",
    "24 Market Street",
    "MELBOURNE VIC 3700"
  );
  header();
  reference(`${matterRef}`, "14 May 2022", "115951554  01");
  generateTable(items, quantum);

  doc.end();
};

export default pdfGenerator;
