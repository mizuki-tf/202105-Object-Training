class Counter {
  constructor() {
    this.count = 0;
  }

  // カウント加算
  up() {
    this.count += 1;
  }

  // countのゲッター
  getValue() {
    return this.count;
  }
}

let counter = new Counter;
counter.up();
console.log(counter.getValue()); // => 1と表示される
counter.up();
console.log(counter.getValue()); // => 2と表示される