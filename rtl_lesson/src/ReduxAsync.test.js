//お決まり3点セット
import React from "react";
import { screen, render, cleanup } from "@testing-library/react"
import useEvent from "@testing-library/user-event"

// test用のstoreを作るお決ま2点りセット
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// storeのreducer
import customCounterReducer from "./features/customCounter/customCounterSlice";

// 今回テストする内容
import ReduxAsync from "./ReduxAsync";

