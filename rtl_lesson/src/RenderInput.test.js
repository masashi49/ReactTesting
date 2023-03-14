import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RenderInput } from "./RenderInput";

// afterEach 1つのdescribeの後にからなず行われru

afterEach(() => cleanup());

describe("Renderring", () => {
  it("Should render all the elements corectly", () => {
    render(<RenderInput />);
    expect(screen.getByRole("button")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter")).toBeTruthy();
  });
});

describe("Input form onChange event", () => {
  it("Should update input value correctly", async () => {
    // async await必要
    render(<RenderInput />);
    const inputValue = screen.getByPlaceholderText("Enter");
    await userEvent.type(inputValue, "test"); // typeはタイピング , testと入力した！
    expect(inputValue.value).toBe("test"); // valueはstateで管理しているので、正しく動いているか確かめる
  });
});

describe("Console Button conditionally triggered", () => {
  it("Shoul not trigger output function", async () => {
    //propsで受け取ったと想定するための、ダミーの関数を作る。
    // jest.fn()は、jestの中でダミー関数だと知らせるためのもの。
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={outputConsole} />); // モック関数を渡す
    await userEvent.click(screen.getByRole("button"));
    expect(outputConsole).not.toHaveBeenCalled(); // outputConsoleの関数が呼び出されない
  });

  it("Shoult trigger output functio", async () => {
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={outputConsole} />); // モック関数を渡す
    const inputValue = screen.getByPlaceholderText("Enter");
    await userEvent.type(inputValue, "test"); // inputにtestと入力
    await userEvent.click(screen.getByRole("button")); // buttonを特定して取得し、クリック
    expect(outputConsole).toHaveBeenCalledTimes(1); // toHaveBeenCalledTimes 一度だけ関数がよばれる
  });
});
