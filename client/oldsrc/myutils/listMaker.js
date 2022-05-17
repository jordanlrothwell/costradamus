// helper function which takes an array of costData and returns a new array of objects
// for each unique value of the 'category' property, with each matching item in its respective category
// the new object has the following properties:
// - id: the unique value of the 'category' property
// - label: the value of the 'category' property
// - items: an array containing the original items that match the category;
// it should add a unique id property to each item in the array
// - tint: integer value which increments each time a new category is added

const listMaker = (costData) => {
  // first add a unique id to each item in the array
  costData.forEach((item, index) => {
    item.id = index;
  });
  const list = [];
  costData.forEach((item) => {
    if (list.findIndex((listItem) => listItem.id === item.category) === -1) {
      list.push({
        id: item.category,
        label: item.category,
        items: [item],
        tint: list.length,
      });
    } else {
      list.find((listItem) => listItem.id === item.category).items.push(item);
    }
  });
  return list;
};

export default listMaker;
