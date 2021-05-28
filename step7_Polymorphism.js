class Counter {
  #value

  constructor() {
    this.#value = 0;
  }

  // upのゲッター
  up() {
    return this.#value += 1;
  }

  // getValueゲッター
  getValue() {
    return this.#value;
  }

}

let counter = new Counter;

counter.up();
console.log(counter.up());
console.log(counter.up());
console.log(counter.getValue());

