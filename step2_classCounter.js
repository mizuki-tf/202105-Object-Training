class Counter {
  constructor() {
    this.count = 0;
  }

  // カウント増加
  up() {
    this.count += 1;
  }

  // カウント減少
  down() {
    this.count -= 1;
  }

  // evenCountのゲッター
  getValue() {
    return this.count;
  }

  // カウントリセット
  resetValue() {
    return this.count = 0;
  }

}

let counter = new Counter;
let counter2 = new Counter;
counter.up();
console.log(counter.getValue()); // => 1と表示される
counter2.up();
console.log(counter2.getValue()); // => 1と表示される

counter.up();
console.log(counter.getValue()); // => 2と表示される
counter2.up();
console.log(counter2.getValue()); // => 2と表示される

counter.down();
console.log(counter.getValue()); // => 1と表示される
counter2.down();
console.log(counter2.getValue()); // => 1と表示される

console.log(counter.resetValue()); // => 0と表示される
console.log(counter2.resetValue()); // => 0と表示される