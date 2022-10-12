"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var imapInit_1 = __importDefault(require("../../../shared/imapInit"));
var mailparser_1 = require("mailparser");
var Error_1 = __importDefault(require("../../../shared/Error"));
var createAttachment_1 = __importDefault(require("./createAttachment"));
var productsOnAttachments_1 = __importDefault(require("../../product/useCases/productsOnAttachments"));
function registerFiles(attachments) {
    return new Promise(function (resolve) {
        var len = attachments.length;
        var i = 0;
        if (len === 0)
            resolve(true);
        var checkStop = function () {
            i += 1;
            if (i === len) {
                resolve(true);
            }
        };
        attachments.forEach(function (attachment) { return (0, createAttachment_1.default)(attachment).then(checkStop).catch(checkStop); });
    });
}
function getAttachFromEmails(query) {
    var _this = this;
    var imap = (0, imapInit_1.default)();
    var attachs = [];
    return new Promise(function (resolve, reject) {
        imap.once('ready', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                imap.openBox('INBOX', false, function () {
                    imap.search(['UNSEEN', ['TEXT', query]], function (err, uids) {
                        if (uids.length === 0) {
                            return resolve(attachs);
                        }
                        var readEmails = imap.fetch(uids, { bodies: '', markSeen: true });
                        readEmails.on('message', function (msg) {
                            msg.on('body', function (stream) {
                                (0, mailparser_1.simpleParser)(stream, function (err, _a) {
                                    var attachments = _a.attachments, date = _a.date;
                                    var nfe = attachments.filter(function (_a) {
                                        var contentType = _a.contentType;
                                        return contentType === 'application/xml';
                                    })[0];
                                    if (nfe) {
                                        attachs.push({
                                            buffer: nfe.content,
                                            bufferFormat: 'xml',
                                            date: date,
                                            name: nfe.checksum
                                        });
                                    }
                                });
                            });
                            imap.end();
                        });
                    });
                });
                return [2 /*return*/];
            });
        }); });
        imap.once('error', function () {
            reject('Unable to read emails');
        });
        imap.once('end', function () {
            resolve(attachs);
        });
        imap.connect();
    });
}
function captureNewNFeEmails() {
    return __awaiter(this, void 0, void 0, function () {
        var attachments, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, getAttachFromEmails('L MOCCI COMERCIO DE FRUTAS LTDA')];
                case 1:
                    attachments = _a.sent();
                    return [4 /*yield*/, registerFiles(attachments)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, productsOnAttachments_1.default)()];
                case 3:
                    _a.sent();
                    return [2 /*return*/, attachments.length];
                case 4:
                    e_1 = _a.sent();
                    throw new Error_1.default('Unable to read emails');
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = captureNewNFeEmails;
