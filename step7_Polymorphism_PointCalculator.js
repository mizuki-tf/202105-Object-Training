// 人に関するクラス
class Human {
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

  constructor() {
    this.peopleData = [];
  }

  // 初期値設定
  valueOf(people) {
    for (let i=0; i < people.length; i++) {
      const hash = people[i];
      const human = new Human(hash.name, hash.point);
      this.peopleData.push(human);
    }
  }

  // 新しい人のデータを配列に追加するメソッド
  addHuman(newHash) {
    const newHuman = new Human(newHash.name, newHash.point);
    this.peopleData.push(newHuman);
  }

  // ポイントの合計を計算するメソッド
  sumPoint() {
    // for文を使用した場合
    //let total = 0;
    //for (let i=0; i < this.peopleData.length; i++) {
    //  total += this.peopleData[i].getPoint();
    //}

    // reduceを使用した場合
    const pointList = this.peopleData.map(results => {
      return results.getPoint();
    })
    const sum = pointList.reduce((acc, value) => acc + value);

    return sum;
  }

  // ポイントの平均を計算するメソッド
  average() {
    const NumOfHuman = this.peopleData.length;
    const avg = this.sumPoint()/NumOfHuman;
    return avg;
  }

  // 最高得点の人を検索するメソッド
  topScoreHuman() {
    const pointList = this.peopleData.map(results => {
      return results.getPoint();
    })
    const topScoreIndex = pointList.indexOf(Math.max.apply(null, pointList));
    return this.peopleData[topScoreIndex].getName();
  }

}


const peopleData = [
  { name: '鈴木', point: 80 },
  { name: '田中', point: 92 },
  { name: '佐藤', point: 75 }
];

const pointCalculator = new PointCalculator;
pointCalculator.valueOf(peopleData);
console.log("合計値：" + pointCalculator.sumPoint());
console.log("平均値：" + pointCalculator.average());
console.log("最高得点者：" + pointCalculator.topScoreHuman());
pointCalculator.addHuman({name: '阿部', point: 95});
console.log("\n");
console.log("合計値：" + pointCalculator.sumPoint());
console.log("平均値：" + pointCalculator.average());
console.log("最高得点者：" + pointCalculator.topScoreHuman());


