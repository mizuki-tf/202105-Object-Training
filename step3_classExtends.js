// 本の情報を扱うクラス
class Book {
  constructor(title, pageSize) {
    this.title = title;
    this.pageSize = pageSize;
  }

  // titleのゲッター
  getTitle() {
    return this.title;
  }

  // titleのセッター
  setTitle(value) {
    this.title = value;
  }

  // pageSizeのゲッター
  getPageSize() {
    return this.pageSize;
  }

  // pageSizeのセッター
  setPageSize(value) {
    this.pageSize = value;
  }
}

// 本棚として本を格納するクラスの基底クラス
class Bookshelf {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    // 自分自身（this）のcanAddBookメソッドを呼び出す
    if (!this.canAddBook(book)) return false;

    this.books.push(book);
    return true;
  }

  findBookByTitle(title) {
    for(let i = 0; i < this.books.length; i++) {
      if (this.books[i].getTitle() === title) return this.books[i];
    }
    return null;
  }

  sumPageSize() {
    let size = 0
    for(let i = 0; i < this.books.length; i++) {
      size += this.books[i].getPageSize();
    }
    return size;
  }

  size() {
    return this.books.length;
  }

  // 今この本を追加できますか？」というチェックを行えるメソッド
  canAddBook(book) {
    return true; // デフォルトでは何も制限を行わないのでどんな時も本を追加できる
  }
}

// 格納できる本の数が指定できる本棚クラス
class LimitedBookshelf extends Bookshelf {
  constructor(maxSize = 3) {
    super(); // 親のconstructorを呼びます
    this.maxSize = maxSize;
    this.Count = 0;
  }

  // 親クラスが作っているメソッドを上書き（オーバーライド）できます。
  canAddBook(book) {
    if (!(this.books.length < this.maxSize)) {
      this.Count += 1;
    }
    return this.books.length < this.maxSize;
  }

  // 追加を拒否した回数を取得するメソッド
  rejectCount() {
    return this.Count;
  }
}

// 坊ちゃんを追加できないようにする本棚クラス
class RejectedBocchanBookshelf extends Bookshelf {
  constructor(notAddedBook = "坊ちゃん") {
    super();
    this.notAddedBook = notAddedBook;
  }

  canAddBook(book) {
    return book.getTitle() !== this.notAddedBook;
  }
}

// 20ページ未満の本しか追加することができないようにする本棚クラス
class ThinBookshelf extends Bookshelf {
  constructor(maxSize = 20) {
    super();
    this.maxSize = maxSize;
  }

  canAddBook(book) {
    return book.getPageSize() < this.maxSize;
  }
}


let bookshelf = new RejectedBocchanBookshelf;

bookshelf.addBook(new Book("我輩は猫である", 454));
bookshelf.addBook(new Book("こころ", 876));
if (!bookshelf.addBook(new Book("坊ちゃん", 876))) {
  console.log(`新しい本を追加できませんでした。`);
}
// 追加されていないかの確認
console.log(bookshelf.findBookByTitle("坊ちゃん"));

let bookshelf2 = new ThinBookshelf;

bookshelf2.addBook(new Book("シャーマンキング", 11));
bookshelf2.addBook(new Book("魁!!男塾", 19));
if (!bookshelf2.addBook(new Book("ナウシカ", 21))) {
  console.log(`新しい本を追加できませんでした。`);
}
// 追加されていないかの確認
console.log(bookshelf2.findBookByTitle("ナウシカ"));

let bookshelf3 = new LimitedBookshelf;

bookshelf3.addBook(new Book("シャーマンキング", 11));
bookshelf3.addBook(new Book("魁!!男塾", 19));
bookshelf3.addBook(new Book("ジョジョの奇妙な冒険", 19));
if (!bookshelf3.addBook(new Book("ドクターストーン", 19))) {
  console.log(`新しい本を追加できませんでした。`);
}
if (!bookshelf3.addBook(new Book("ナウシカ", 21))) {
  console.log(`新しい本を追加できませんでした。`);
}
// 追加拒否回数表示
console.log(bookshelf3.rejectCount());