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
    expect(actual).toHaveLength(2); //長さ比較同じ

    const primitiveValueArray = [1, 2, 3];
    //before
    expect(primitiveValueArray.includes(1)).toBeTruthy();
    //after toContainは、アイテムが配列の中に含まれているかを確認できる
    expect(primitiveValueArray).toContain(1);
    expect(primitiveValueArray).not.toContain(4);

    const hoge = { key: "hoge" };
    const foo = [hoge, { key: "foo" }];
    expect(foo.includes(hoge)).toBeTruthy(); // fooはhogeを含んでいる
    expect(foo).toContain(hoge); // これでも同じ意味
  });

  //　明日はここから
  //https://zenn.dev/t_poyo/articles/4c47373e364718#%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88(%E9%80%A3%E6%83%B3%E9%85%8D%E5%88%97%EF%BC%89%E3%81%AE%E3%83%86%E3%82%B9%E3%83%88
});

// 続きははこちらhttps://jestjs.io/ja/docs/getting-started
