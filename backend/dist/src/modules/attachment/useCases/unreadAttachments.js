"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = __importDefault(require("../infra/service"));
function unreadAttachments() {
    return service_1.default.findMany(0);
}
exports.default = unreadAttachments;
