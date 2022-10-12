"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = __importDefault(require("../middlewares/auth"));
var attachment_routes_1 = __importDefault(require("./attachment.routes"));
var product_routes_1 = __importDefault(require("./product.routes"));
var router = (0, express_1.Router)();
router.get('/', function (request, response) {
    response.json({
        status: 'online'
    });
});
router.use('/attachments', auth_1.default, attachment_routes_1.default);
router.use('/products', auth_1.default, product_routes_1.default);
exports.default = router;
