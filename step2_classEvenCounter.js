class EvenCounter {
  constructor() {
    this.evenCount = 0;
    this.count = 0;
  }

  // 偶数でカウント増加
  up() {
    this.count += 1;
    if (this.count % 2 === 0) {
      this.evenCount += 1;
    }
  }

  // evenCountのゲッター
  getValue() {
    return this.evenCount;
  }
}

let counter = new EvenCounter;
counter.up(); // => ここではアップしない
counter.up(); // => ここでアップ
console.log(counter.getValue()); // => 1と表示される
counter.up(); // => ここではアップしない
counter.up(); // => ここでアップ
counter.up(); // => ここではアップしない
console.log(counter.getValue()); // => 2と表示される