"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronNewNFeEmails = void 0;
var node_cron_1 = __importDefault(require("node-cron"));
var captureNewNFeEmails_1 = __importDefault(require("../modules/attachment/useCases/captureNewNFeEmails"));
function cronNewNFeEmails() {
    node_cron_1.default.schedule('*/30 8,9,10,11,12 * * *', function () {
        try {
            (0, captureNewNFeEmails_1.default)();
        }
        catch (_a) {
            // 
        }
    }, {
        timezone: 'America/Sao_Paulo'
    });
}
exports.cronNewNFeEmails = cronNewNFeEmails;
