import { cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";

afterEach(() => {
  cleanup();
});

describe("テストを完全に理解する道のり", () => {
  const hoge = { key: "hoge" };
  const anotherHoge = { key: "hoge" };
  it("toBeを確認する", () => {
    // 同じ参照
    expect(hoge).toBe(hoge);
    //同じ値だけど違う参照
    expect(hoge).not.toBe(anotherHoge);
    expect(hoge).not.toBe({ key: "hoge" });
    expect(hoge).not.toBe({ ...hoge });
  });

  it("toEqualを確認する", () => {
    // toEqualを使用して比較
    // toEqualは、再起的にイコールかを見る
    // 違う参照でも、値が同じであればtrue
    expect(hoge).toEqual(hoge);
    expect(hoge).toEqual(anotherHoge);
    expect(hoge).toEqual({ key: "hoge" });
    expect(hoge).toEqual({ ...hoge });
  });

  it("toStrictEqualを確認する", () => {
    // toStrictEqual
    expect({ id: undefined, key: "hoge" }).toEqual({ key: "hoge" });
    expect({ id: undefined, key: "hoge" }).not.toStrictEqual({
      key: "hoge",
    });

    class CustomClass {
      constructor(hoge) {
        this.key = hoge;
      }
    }
    const hogeFrom = new CustomClass("hoge");
    const hoge = { key: "hoge" };

    expect(hogeFrom).toEqual(hoge); // toEqualだと同じと解釈する
    expect(hogeFrom).not.toStrictEqual(hoge);

    //参照や値を厳密に比較できる
  });

  it("配列のテスト", () => {
    const actual = [0, 3];
    expect(actual).toBe(actual);
    expect(actual).not.toBe([0, 3]); // 参照違うからnot

    expect(actual).toEqual([0, 3]); // 中身が同じなのでtrue
    expect(actual).toStrictEqual([0, 3]); // 配列はこれでもtrue

    expect(actual.length).toBe(2); // 長さ比較
    expect(actual).toHaveLength(2); //長さ比較同じ。toHaveLengthはオブジェクトに.lehgthがあり、特定の数値に設定されていることを確認する

    const primitiveValueArray = [1, 2, 3];
    expect(primitiveValueArray.includes(1)).toBeTruthy(); // toBeTruthy 真かどうか。

    // toContainは、アイテムが配列の中に含まれているかを確認できる
    expect(primitiveValueArray).toContain(1);
    expect(primitiveValueArray).not.toContain(4);

    const hoge = { key: "hoge" };
    const foo = [hoge, { key: "foo" }];
    expect(foo.includes(hoge)).toBeTruthy(); // fooはhogeを含んでいる
    expect(foo).toContain(hoge); // これでも同じ意味
  });

  it("objectののテスト", () => {
    const hoge = { key: "hoge" };
    expect(hoge.key).toEqual("hoge"); // 値が同じか
    expect(hoge).toHaveProperty("key", "hoge"); // toHavePropertyはtoEqualが基準となるので、参照一致は見ない。
  });

  it("特定のkey-valueのペアテスト", () => {
    const hoge = { id: 1, name: "hoge", address: "foo" };
    const huga = { address: "foo" };

    Object.entries(huga).forEach(([key, value]) => {
      expect(hoge[key]).toEqual(value); // 内容に含まれているのでtrue
    });

    expect(hoge).toMatchObject(huga); // 短くかける
    expect(hoge).toMatchObject({
      id: expect.any(Number), // 中にexpect書ける。
      address: expect.any(String),
    });
  });
});

describe("モックしたメソッドのテスト", () => {
  const targetMethod = (func) => func("some argument");

  const mockDependency = jest.fn();
  targetMethod(mockDependency);

  expect(mockDependency.mock.calls.length).toBe(1); //　何回呼ばれたのか
  expect(mockDependency.mock.calls[0]).toEqual(["some argument"]); //何回目に何が渡されたか

  targetMethod(mockDependency);
  expect(mockDependency.mock.calls.length).toBe(2);

  //上記をmock.callsを使わずに見やすくする
  expect(mockDependency).toBeCalledTimes(2);
  expect(mockDependency).nthCalledWith(2, "some argument");
});
// 続きははこちらhttps://jestjs.io/ja/docs/getting-started
