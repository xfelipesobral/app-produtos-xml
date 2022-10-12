"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Error_1 = __importDefault(require("../shared/Error"));
function auth(request, response, next) {
    var authorization = request.headers.authorization;
    if (!authorization) {
        throw new Error_1.default('Authorization token missing', 401);
    }
    var password = process.env.REST_PASSWORD || 'strongpassword';
    if (authorization === password) {
        return next();
    }
    throw new Error_1.default('Bad password', 401);
}
exports.default = auth;
