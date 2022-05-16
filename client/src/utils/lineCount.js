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
