import { cleanup } from "@testing-library/react";

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
});

// 続きははこちらhttps://jestjs.io/ja/docs/getting-started
