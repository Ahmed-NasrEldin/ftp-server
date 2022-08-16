const PDFDocument = require("pdfkit");
const fs = require("fs");
function textInRowFirst(doc, text, heigth) {
  doc.y = heigth;
  doc.x = 30;
  doc.fillColor("black");
  doc.text(text, {
    paragraphGap: 5,
    indent: 5,
    align: "justify",
    columns: 1,
  });
  return doc;
}

function row(doc, heigth) {
  doc.lineJoin("miter").rect(30, heigth, 500, 20).stroke();
  return doc;
}

// Create a document
const doc = new PDFDocument();

// Saving the pdf file in root directory.
doc.pipe(fs.createWriteStream("example.pdf"));

// Adding functionality
doc.fontSize(27).text("This the article for GeeksforGeeks", 100, 100);

// Adding image in the pdf.

doc.image("image.png", {
  fit: [300, 300],
  align: "center",
  valign: "center",
});

doc
  .addPage()
  .fontSize(15)
  .text("Generating PDF with the help of pdfkit", 100, 100);

// Apply some transforms and render an SVG path with the
// 'even-odd' fill rule
doc
  .scale(0.6)
  .translate(470, -380)
  .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
  .fill("red", "even-odd")
  .restore();

// Add some text with annotations
doc
  .addPage()
  .fillColor("blue")
  .text("The link for GeeksforGeeks website", 100, 100)

  .link(100, 100, 160, 27, "https://www.geeksforgeeks.org/");

row(doc, 90);
row(doc, 110);
row(doc, 130);
row(doc, 150);
row(doc, 170);
row(doc, 190);
row(doc, 210);

textInRowFirst(doc, "Nombre o razón social", 100);
textInRowFirst(doc, "RUT", 120);
textInRowFirst(doc, "Dirección", 140);
textInRowFirst(doc, "Comuna", 160);
textInRowFirst(doc, "Ciudad", 180);
textInRowFirst(doc, "Telefono", 200);
textInRowFirst(doc, "e-mail", 220);

// Finalize PDF file
doc.end();
