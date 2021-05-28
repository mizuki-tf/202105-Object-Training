// 商品に関するクラス
class item {
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