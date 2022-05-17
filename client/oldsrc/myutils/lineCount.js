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

const lineCount = function (itemNumber) {
  const oneLine = [12, 13, 15, 23, 35, 44, 52, 53, 57, 63, 64, 73, 75, 80];
  const twoLine = [
    4, 7, 9, 10, 16, 18, 20, 21, 22, 24, 26, 27, 28, 29, 30, 31, 32, 33, 37, 42,
    45, 47, 57.1, 65, 69, 71, 74,
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

let spacing = testItems.map(item => lineCount(item.itemNumber));

console.log(spacing)