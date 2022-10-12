"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var imap_1 = __importDefault(require("imap"));
function imapInit() {
    var imap = new imap_1.default({
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
        host: process.env.EMAIL_HOST || 'imap.gmail.com',
        port: Number(process.env.EMAIL_PORT || '993'),
        tls: typeof process.env.EMAIL_TLS !== 'undefined' ? process.env.EMAIL_TLS === '1' : true,
        tlsOptions: {
            servername: process.env.EMAIL_HOST || 'imap.gmail.com'
        }
    });
    return imap;
}
exports.default = imapInit;
