// 人に関するクラス
class People {
  #name
  #point

  constructor(name, point) {
    this.#name = name;
    this.#point = point;
  }

  getName() {
    return this.#name;
  }

  getPoint() {
    return this.#point;
  }
}

// ポイント集計に関するクラス
class PointCalculator {
  #results

  constructor() {
    this.#results = [];
  }

  // 初期値設定
  valueOf(arrayOfHash) {
    for (let i=0; i < arrayOfHash.length; i++) {
      let hash = arrayOfHash[i];
      let people = new People(hash.name, hash.point);
      this.#results.push(people);
    }
  }

  // 新しい人のデータを配列に追加するメソッド
  addPeople(newHash) {
    let newPeople = new People(newHash.name, newHash.point);
    this.#results.push(newPeople);
  }

  // ポイントの合計を計算するメソッド
  sumPoint() {
    // for文を使用した場合
    //let total = 0;
    //for (let i=0; i < this.#results.length; i++) {
    //  total += this.#results[i].getPoint();
    //}

    // reduceを使用した場合
    let pointList = this.#results.map(results => {
      return results.getPoint();
    })
    const sum = pointList.reduce((acc, value) => acc + value);

    return sum;
  }

  // ポイントの平均を計算するメソッド
  average() {
    let NumOfPeople = this.#results.length;
    let avg = this.sumPoint()/NumOfPeople;
    return avg;
  }

  // 最高得点の人を検索するメソッド
  topScorePeople() {
    let pointList = this.#results.map(results => {
      return results.getPoint();
    })
    let topScoreIndex = pointList.indexOf(Math.max.apply(null, pointList));
    return this.#results[topScoreIndex].getName();
  }

}


let results = [
  { name: '鈴木', point: 80 },
  { name: '田中', point: 92 },
  { name: '佐藤', point: 75 }
];

let pointCalculator = new PointCalculator;
pointCalculator.valueOf(results);
console.log("合計値：" + pointCalculator.sumPoint());
console.log("平均値：" + pointCalculator.average());
console.log("最高得点者：" + pointCalculator.topScorePeople());
pointCalculator.addPeople({name: '阿部', point: 95});
console.log("\n");
console.log("合計値：" + pointCalculator.sumPoint());
console.log("平均値：" + pointCalculator.average());
console.log("最高得点者：" + pointCalculator.topScorePeople());


