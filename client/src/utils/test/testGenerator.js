const formatConstants = {
  logo: [50, 50],
  address: [450, 50],
  header: [50, 150],
  reference: [380, 200],
  items: [50, 255],
};

function address(firm, ABN, addr1, addr2, addr3) {
  const [x, y] = formatConstants.address;

  return `.fontSize(8).text("${firm}", ${x}, ${y}).fontSize(8).text("${ABN}", ${x}, ${y} + 10).fontSize(8).text("${addr1}", ${x}, ${y} + 30).fontSize(8).text("${addr2}", ${x}, ${y} + 40).fontSize(8).text("${addr3}", ${x}, ${y} + 50)`;
}

console.log(
  address(
    "Costradamus Law",
    "ABN: 51 496 096 744",
    "PO Box 13025",
    "24 Market Street",
    "MELBOURNE VIC 3700"
  )
);
