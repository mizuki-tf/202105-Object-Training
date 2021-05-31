// 商品に関するクラス
class Item {
  #itemName
  #price

  constructor(itemName, price) {
    this.#itemName = itemName;
    this.#price = price;
  }

  getItemName() {
    return this.#itemName;
  }

  getPrice() {
    return this.#price;
  }
}

class VendingMachine {

  constructor() {
    this.items = [];
  }

  itemList() {
    return this.items;
  }

  // 商品の追加に関するメソッド
  addItem(item) {
    this.items.push(item);
  }

  // 商品の購入に関するメソッド
  buy(productName, cash) {
    const stock = this.canBuy(productName);
    if (!stock) {
      return productName + "の在庫がありません";
    } else if (cash < (this.items.find(item => item.getItemName() === productName)).getPrice()) {
      return productName + "を購入するお金がたりません";
    } else {
      const nameIndex = this.items.indexOf(this.items.find(item => item.getItemName() === productName));
      this.items.splice(nameIndex, 1);
      return productName + "を購入しました";
    }
  }

  // 商品の在庫に関するメソッド
  canBuy(productName) {
    const stock = this.items.some(item => item.getItemName() === productName);
    return stock;
  }
}

let vendingMachine = new VendingMachine;

// 商品追加
vendingMachine.addItem(new Item("コーラ", 120));
vendingMachine.addItem(new Item("オレンジジュース", 110));
vendingMachine.addItem(new Item("お茶", 100));
// 商品の在庫追加
vendingMachine.addItem(new Item("コーラ", 120));
vendingMachine.addItem(new Item("コーラ", 120));
vendingMachine.addItem(new Item("コーラ", 120));
vendingMachine.addItem(new Item("オレンジジュース", 110));
vendingMachine.addItem(new Item("お茶", 100));
// 確認
//console.log(vendingMachine.itemList());
// 商品の購入
console.log("購入商品：" + vendingMachine.buy("オレンジジュース", 110));
console.log("購入商品：" + vendingMachine.buy("コーラ", 100));
console.log("購入商品：" + vendingMachine.buy("お茶", 110));
console.log("購入商品：" + vendingMachine.buy("お茶", 110));
console.log("購入商品：" + vendingMachine.buy("お茶", 110));
// 在庫確認
console.log("在庫：" + vendingMachine.canBuy("オレンジジュース"));
console.log("在庫：" + vendingMachine.canBuy("お茶"));






