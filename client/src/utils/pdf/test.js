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

function generateRow(currentItem, quantum) {
    // helper function to grab correct scale value based on quantum
    function getScale(item, quantum) {
      if (quantum < 500) {
        return item.scale.A;
      }
      if ((500 < quantum) && (quantum < 5000)) {
        return item.scale.B;
      }
      if ((5000 <= quantum) && (quantum < 7500)) {
        return item.scale.C;
      }
      if ((7500 <= quantum) && (quantum < 20000)) {
        return item.scale.D;
      }
      if ((20000 <= quantum) && (quantum < 40000)) {
        return item.scale.E;
      }
      if ((40000 <= quantum) && (quantum < 70000)) {
        return item.scale.F;
      }
      if (70000 <= quantum) {
        return item.scale.G;
      }
    }
  
    const amount = getScale(currentItem, quantum);
    console.log(amount)
  
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
    console.log(amountString)

    console.log(currentItem.description)

  }

generateRow(testItems[1], 49000)
