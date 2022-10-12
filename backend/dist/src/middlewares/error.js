"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
var Error_1 = __importDefault(require("../shared/Error"));
function error(err, request, response, next) {
    if (err instanceof Error_1.default) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }
    return response.status(500).json({
        status: 'error',
        message: "Internal server error - ".concat(err.message)
    });
}
exports.default = error;
