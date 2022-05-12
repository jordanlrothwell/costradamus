// uses pdfkit to generate pdf 

const fs = require('fs');
const pdf = require('pdfkit');
const path = require('path');

const doc = new pdf();

const pdfGenerator = (data, fileName) => {
    doc.pipe(fs.createWriteStream(path.join(__dirname, '../../server/doc/' + fileName + '.pdf')));
    doc.fontSize(20).text(data);
    doc.end();
}

pdfGenerator('Hello World', 'REEEE');