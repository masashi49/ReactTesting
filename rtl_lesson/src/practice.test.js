import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

describe("テストを完全に理解する道のり", () => {
  it("Object.isを確認する", () => {
    const hoge = { key: "hoge" };
    const anotherHoge = { key: "hoge" };

    // 同じ参照
    expect(hoge).toBe(hoge);

    //同じ値だけど違う参照
    expect(hoge).not.toBe(anotherHoge);
    expect(hoge).not.toBe({ key: "hoge" });
    expect(hoge).not.toBe({ ...hoge });

    // toEqualを使用して比較
    // toEqualは、再起的にイコールかを見る
    // 違う参照でも、値が同じであればtrue
    expect(hoge).toEqual(hoge);
    expect(hoge).toEqual(anotherHoge);
    expect(hoge).toEqual({ key: "hoge" });
    expect(hoge).toEqual({ ...hoge });


  });
});

// 続きははこちらhttps://jestjs.io/ja/docs/getting-started
