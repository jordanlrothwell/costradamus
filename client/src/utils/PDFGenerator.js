const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// test data with name and amount
const costData = require("../data/costData.json")

console.log(costData[0])
const testData = [{
    itemNumber: 1,
    description: 'Claim for debt, liquidated demand or claim arising from a motor vehicle accident for costs of repairs only or for total loss of vehicle only including all professional costs.',
    special: { rate: null, amount: null },
    category: 'Claim',
    scale: { A: 232, B: 486, C: 596, D: 718, E: 891, F: 1073, G: 1282 }
  },
  {
      itemNumber: 2,
      description: 'Claim for debt, liquidated demand or claim arising from a motor vehicle accident for costs of repairs only or for total loss of vehicle only including all professional costs.',
      special: { rate: null, amount: null },
      category: 'Claim',
      scale: { A: 232, B: 486, C: 596, D: 718, E: 891, F: 1073, G: 1282 }
    },
  {
      itemNumber: 3,
      description: 'Claim for debt, liquidated demand or claim arising from a motor vehicle accident for costs of repairs only or for total loss of vehicle only including all professional costs.',
      special: { rate: null, amount: null },
      category: 'Claim',
      scale: { A: 232, B: 486, C: 596, D: 718, E: 891, F: 1073, G: 1282 }
    },
]

// variable to store pdf name
const pdfName = "test.pdf";

// function which takes a list of costs and a name as parameters and pipes a PDF file to the browser as a download
function generatePDF(costs, name) {
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  doc.pipe(fs.createWriteStream(`./${name}.pdf`));

    // create a table with the data
    doc.fontSize(12).text("Costs");
    doc.moveDown();
    doc.table(costs, {
        margin: { top: 50, left: 50, right: 50, bottom: 50 },
        width: 500,
        layout: "lightHorizontalLines",
        columnStyles: {
            0: { columnWidth: 100 },
            1: { columnWidth: 100 },
            2: { columnWidth: 100 },
            3: { columnWidth: 100 },
            4: { columnWidth: 100 },
            5: { columnWidth: 100 },
        },
    });


  doc.end();
}

// generatePDF(data, pdfName)