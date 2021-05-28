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
  #productNameList

  constructor() {
    this.#productNameList = [];
  }

  itemList() {
    return this.#productNameList;
  }

  // 商品の追加に関するメソッド
  addItem(item) {
    item.stock = 0;
    this.#productNameList.push(item);
  }

  // 自販機で販売している商品とその在庫に関するメソッド
  itemReplenishment(productName, stock) {
    const index = this.searchProduct(productName);
    this.#productNameList[index].stock += stock;
  }

  // 商品の購入に関するメソッド
  buy(productName, cash) {
    const index = this.searchProduct(productName);
    if (this.#productNameList[index].stock === 0 || this.#productNameList[index].getPrice() > cash) {
      console.log("在庫が無い、もしくは金額が足りていません");
    } else {
      this.#productNameList[index].stock -= 1;
      return this.#productNameList[index];
    }
  }

  // 在庫確認に関するメソッド
  canBuy(productName) {
    // 在庫があったらtrue
    const index = this.searchProduct(productName);
    return this.#productNameList[index].stock !== 0;
  }

  // 商品の検索に関するメソッド
  searchProduct(productName) {
    let productNameList = this.#productNameList.map(productNameList => {
      return productNameList.getItemName();
    })
    let nameIndex = productNameList.indexOf(productName);
    return nameIndex;
  }
}

let vendingMachine = new VendingMachine;

// 商品追加
vendingMachine.addItem(new Item("コーラ", 120));
vendingMachine.addItem(new Item("オレンジジュース", 110));
vendingMachine.addItem(new Item("お茶", 100));
// 商品の在庫追加
vendingMachine.itemReplenishment("コーラ", 3);
vendingMachine.itemReplenishment("オレンジジュース", 5);
vendingMachine.itemReplenishment("お茶", 1);
vendingMachine.itemReplenishment("オレンジジュース", 5);
// 商品追加
vendingMachine.addItem(new Item("水", 100));
// 確認
//console.log(vendingMachine.itemList());
// 商品の購入
console.log("購入商品：" + vendingMachine.buy("オレンジジュース", 110).getItemName());
vendingMachine.buy("オレンジジュース", 100);
console.log("購入商品：" + vendingMachine.buy("お茶", 110).getItemName());
// 在庫確認
console.log("在庫：" + vendingMachine.canBuy("オレンジジュース"));
console.log("在庫：" + vendingMachine.canBuy("お茶"));






