// よく使われるjestのマッチャーについて利用順に解説とサンプルコードを実装していく。
// 「よく使われる」はGPT-3が判断しています。

describe("よく使われるjestのマッチャー", () => {
  it("toBe : 厳密に等しいか", () => {
    const spyHoge = jest.fn((x) => 10 + x);
    spyHoge();
    expect(spyHoge(100)).toBe(110);

    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const obj3 = obj1;
    expect(obj1).toBe(obj3); // 参照が同じためtrue
    expect(obj1).not.toBe(obj2); // 参照違う

    const arr1 = [1, 2];
    const arr2 = [1, 2];
    const arr3 = arr1;
    expect(arr1).toBe(arr3); // 参照が同じためtrue
    expect(arr1).not.toBe(arr2); // 参照違う
  });
});

// toBeは参照の比較も行うこと知っておく。
// オブジェクトのプロパティ値だけを比較したい場合、toEqualを使うのが良い。

// toEqualとtoStrictEqualの違い
describe("s", () => {
  it("toEqual", () => {
    // objectや配列の値が同じかどうかに使う。参照は見ない
    const obja = { a: 1, b: 2 };
    const objb = { b: 2, a: 1 };
    expect(obja).toEqual(objb);

    const arra = [4, 5];
    const arrb = [4, 5];
    const arrc = [5, 4];
    expect(arra).toEqual(arrb);
    expect(arra).not.toEqual(arrc);
  });

  it("toStrictEqual", () => {
    const obja = { a: 1, b: 2 };
    const objb = { b: 2, a: 1 };
    expect(obja).toStrictEqual(objb); //成功する
    function Obja() {
      this.a = 1;
    }
    function Objb() {
      this.a = 1;
    }
    expect(Obja).not.toEqual(Objb);
    const Objc = () => {
      this.a = 1;
    };
    const Objd = () => {
      this.a = 1;
    };
    expect(Objc).not.toEqual(Objd);
  });
});

describe("よく使われるjestのマッチャー", () => {
  it("toEqual : 値が等しいか", () => {
    const objc = { foo: "bar", hoge: { id: 2, name: "りんご" } };
    const objd = { foo: "bar", hoge: { id: 2, name: "りんご" } };
    expect(objd).toEqual(objc); // 参照見ない
  });

  it("expect.toBeDefined:定義されているか", () => {
    const x = 10;
    let y;
    expect(x).toBeDefined();
    expect(y).not.toBeDefined();
  });

  it("toBeNull:nullかどうか", () => {
    const x = () => null;
    const y = 10;
    expect(x()).toBeNull();
    expect(y).not.toBeNull();
  });

  test("toBeTruthy:真か。toBeFalsy:偽か", () => {
    const w = {};
    const x = true;
    const y = false;
    const z = null;
    expect(w).toBeTruthy();
    expect(x).toBeTruthy();
    expect(y).toBeFalsy();
    expect(z).toBeFalsy();
  });

  test("toContain: 含むかどうか", () => {
    const x = [1, 2, 3, 4];
    const y = { key: "key", value: "value" };

    expect(x).toContain(4);
    expect(x).not.toContain(0);
    expect(y).not.toContain({ id: 1 });
  });

  test("toHaveLength: xの長さ", () => {
    const x = [1, 2, 3, 4];
    expect(x).toHaveLength(4);
  });

  test("toMatch: xがyにマッチするか(yは正規表現使用可能)", () => {
    const x = "hello";
    expect(x).toMatch("hello");
    expect(x).toMatch(/hello/);
  });

  test("expect.toBeInstanceOf: xがyのインスタンスか", () => {
    class x {}
    const X = new x();
    expect(X).toBeInstanceOf(x);
  });
});
