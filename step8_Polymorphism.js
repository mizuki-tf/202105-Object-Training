// 本の情報を扱うクラス
class Book {
  // 初期化時に使われるコンストラクタ
  constructor(title, pageSize) {
    this.title = title;
    this.pageSize = pageSize;
  }

  // 以下はクラス内の情報（プロパティや属性と呼ばれる）の操作

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


// メソッドを呼ぶと細かいログを出してくれるBookshelf
class DebugBookshelf extends Bookshelf {
  // addBookメソッドのデバックログ表示
  addBook(book) {
    console.debug(`addBook { ${book.getTitle()}, ${book.getPageSize()} }`);
    return super.addBook(book);
  }

  // findBookByTitleメソッドのデバックログ表示
  findBookByTitle(title) {
    console.debug(`findBookByTitle(${title}): { ${super.findBookByTitle(title).getTitle()}, ${super.findBookByTitle(title).getPageSize()} }`);
    return super.findBookByTitle(title);
  }

  // 親クラスが作っているメソッドを上書き（オーバーライド）できます。
  canAddBook(book) {
    console.debug(`canAddBook { ${book.getTitle()}, ${book.getPageSize()} }`);
    return super.canAddBook(book);
  }
}

// 格納できる本の数が指定できる本棚クラス
class LimitedBookshelf extends Bookshelf {
  constructor(maxSize = 3) {
    super(); // 親のconstructorを呼びます
    this.maxSize = maxSize;
  }

  // 親クラスが作っているメソッドを上書き（オーバーライド）できます。
  canAddBook(book) {
    return this.books.length < this.maxSize;
  }
}

// 環境変数を利用してインスタンス化するクラスを変えるメソッド
function createLimitedBookshelf() {
  if(process.env.NODE_ENV == 'development') {
    return new DebugBookshelf(); // 開発中はデバッグ用のログが出るクラスをインスタンス化
  } else {
    return new LimitedBookshelf(); // 本番稼働中はログが出ないクラスをインスタンス化
  }
}

// 下記のように呼び出すとデバッグ時の動作です
// NODE_ENV=development node step8_Polymorphism.js
console.log(process.env.NODE_ENV);


let bookshelf = createLimitedBookshelf()

bookshelf.addBook(new Book("坊ちゃん", 520));
bookshelf.addBook(new Book("我輩は猫である", 454));
bookshelf.addBook(new Book("こころ", 876));

if (!bookshelf.addBook(new Book("門", 345))) {
  console.log(`新しい本を追加できませんでした。今の本の数: ${bookshelf.size()}`);
}

console.log(bookshelf.findBookByTitle("こころ"));
console.log(bookshelf.sumPageSize());