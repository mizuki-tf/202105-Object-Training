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

  // 指定したハッシュの配列から初期の本棚を作り出す
  static valueOf(arrayOfHash) {
    // thisの型に関連している new が呼ばれます。
    // 今回のサンプルではnew LimitedBookshelfが呼ばれます。
    let bookshelf = new this;

    for (let i = 0; i < arrayOfHash.length; i++) {
      let hash = arrayOfHash[i];
      let book = new Book(hash.title, hash.pageSize);
      bookshelf.addBook(book);
    }
    return bookshelf;
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
class RentalBookshelf extends Bookshelf {
  constructor(maxSize = 3) {
    super(); // 親のconstructorを呼びます
    this.maxSize = maxSize;
    this.count = 0;
    this.rentBooksList = [];
  }

  // 親クラスが作っているメソッドを上書き（オーバーライド）できます。
  canAddBook(book) {
    if (!(this.books.length < this.maxSize)) {
      this.count += 1;
    }
    return this.books.length < this.maxSize;
  }

  // 追加を拒否した回数を取得するメソッド
  rejectCount() {
    return this.count;
  }

  // 指定の本を借りるメソッド
  rentBook(book) {
    this.rentBooksList.push(book);
  }

  // 指定の本を返すメソッド
  returnBook(book) {
    for(let i = 0; i < this.rentBooksList.length; i++) {
      if (book.getTitle() === this.rentBooksList[i].title)
        return this.rentBooksList.splice(i,1);
    }
  }

  // 貸し出されている本の一覧を取得するメソッド
  lisetRentedBooks() {
    return this.rentBooksList;
  }

  // 指定の本が貸出中か調べ、貸出中なら真、そうでなければ疑とするメソッド
  isRented(book) {
    const found = this.rentBooksList.find(_element => _element.title === book.getTitle());
    return found !== undefined;
  }
}



// booksが通信の結果だったり、ファイルから読んだりするなど外部から与えられる想定
let books = [
  { title: "坊ちゃん", pageSize: 520 },
  { title: "我輩は猫である", pageSize: 454 },
  { title: "こころ", pageSize: 876 }
];

// valueOfはBookshelfで定義していますが、派生クラスのRentalBookshelfでも使えます
let bookshelf = RentalBookshelf.valueOf(books);

bookshelf.rentBook(bookshelf.findBookByTitle("こころ"));
bookshelf.rentBook(bookshelf.findBookByTitle("坊ちゃん"));
console.log(bookshelf.lisetRentedBooks());
bookshelf.returnBook(bookshelf.findBookByTitle("こころ"));
console.log(bookshelf.lisetRentedBooks());
console.log("貸し出し状態" + bookshelf.isRented(bookshelf.findBookByTitle("こころ")));
console.log("貸し出し状態" + bookshelf.isRented(bookshelf.findBookByTitle("坊ちゃん")));

