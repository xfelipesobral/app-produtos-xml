"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
var routes_1 = __importDefault(require("./src/routes"));
var error_1 = __importDefault(require("./src/middlewares/error"));
var crons_1 = require("./src/utils/crons");
(0, dotenv_1.config)();
var appPort = process.env.SERVER_PORT || 3300;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(error_1.default);
app.listen(appPort, function () { return console.log("Server is running on port ".concat(appPort, "!")); });
(0, crons_1.cronNewNFeEmails)();
