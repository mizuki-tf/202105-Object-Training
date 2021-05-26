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

  // countのゲッター
  getValue() {
    return this.count;
  }

  // 現在のカウントが0にリセットされる
  resetValue() {
    return this.count = 0;
  }
}

let counter = new Counter;
counter.up();
console.log(counter.getValue()); // => 1と表示される
counter.up();
console.log(counter.getValue()); // => 2と表示される
counter.down();
console.log(counter.getValue()); // => 1と表示される
console.log(counter.resetValue()); // => 0と表示される