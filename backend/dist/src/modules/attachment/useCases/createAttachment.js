"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var uuid_1 = require("uuid");
var service_1 = __importDefault(require("../infra/service"));
var Error_1 = __importDefault(require("../../../shared/Error"));
function createAttachment(_a) {
    var name = _a.name, uri = _a.uri, buffer = _a.buffer, bufferFormat = _a.bufferFormat, date = _a.date;
    if (!date)
        date = new Date();
    if (!uri && !buffer) {
        throw new Error_1.default('Attachment buffer or uri is obrigatory');
    }
    if (buffer) {
        if (!name)
            name = (0, uuid_1.v4)();
        uri = "uploads/".concat(name, ".").concat(bufferFormat || 'xml');
        fs_1.default.createWriteStream(uri).write(buffer);
    }
    return service_1.default.create({ id: '', uri: uri, date: date });
}
exports.default = createAttachment;
