import {
  HelloAgainRest
} from "./chunk-NGICDVII.js";
import {
  HelloRest
} from "./chunk-GOYQ4LZK.js";
import "./chunk-SHUYVCID.js";

// src/main.ts
import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";
var app = express();
useExpressServer(app, {
  controllers: [
    HelloRest,
    HelloAgainRest
  ]
});
var PORT = process.env.PORT || 3e3;
app.listen(PORT, () => {
  console.log(`Example REST server running at http://localhost:${PORT}/saga-soa/hello`);
});
