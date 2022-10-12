"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var captureNewNFeEmails_1 = __importDefault(require("../modules/attachment/api/captureNewNFeEmails"));
var attachmentsRouter = (0, express_1.Router)();
attachmentsRouter.get('/check', captureNewNFeEmails_1.default);
exports.default = attachmentsRouter;
