"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var getProducts_1 = __importDefault(require("../modules/product/api/getProducts"));
var productsRouter = (0, express_1.Router)();
productsRouter.get('/', getProducts_1.default);
exports.default = productsRouter;
