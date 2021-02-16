const data = require('./example.json');
const terminal = require('readline');

const cmd = terminal.createInterface({
  input: process.stdin,
  output: process.stdout
});

const findItemsInTheMeetingRoom = (arr) => {
  let result = arr.filter(({ placement }) => {
    return placement.name === 'Meeting Room'
  })
  return result;
};

const findElectronicsItem = (arr) => {
  let result = arr.filter(({ type }) => {
    return type === 'electronic'
  })
  return result;
};

const findFurnitureItem = (arr) => {
  let result = arr.filter(({ type }) => {
    return type === 'furniture'
  })
  return result;
};

const findItemPurchasedOnJan = (arr) => {
  let result = arr.filter(({ purchased_at }) => {
    let p2 = new Date(purchased_at * 1000)
    return p2.getDate() === 16 && p2.getMonth() + 1 === 1 && p2.getFullYear() === 2020
  })
  return result;
};

const findBrownColouredItem = (arr) => {
  let result = arr.filter(({ tags }) => {
    return tags.some(data => data === "brown")
  })
  return result;
};

const main = () => {
  cmd.prompt();

  console.log(`
    1.  Find items in the Meeting Room.
    2.  Find all electronic devices.
    3.  Find all the furniture.
    4.  Find all items were purchased on 16 Januari 2020.
    5.  Find all items with brown color.
  `);

  cmd.question("Masukan Pilihan!!! ", (input) => {
    switch (input) {
      case '1':
        console.log(findItemsInTheMeetingRoom(data))
        break;
      case '2':
        console.log(findElectronicsItem(data))
        break;
      case '3':
        console.log(findFurnitureItem(data))
        break;
      case '4':
        console.log(findItemPurchasedOnJan(data))
        break;
      case '5':
        console.log(findBrownColouredItem(data))
        break;
    }
  });
};

main();