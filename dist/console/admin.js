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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const menu_1 = require("./menu");
const server_1 = require("./../server/server");
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        const portPromt = "\t\t-- Admin --\n\n" +
            "On which you want to create server?";
        const port = yield (0, menu_1.getNumberFromConsole)(portPromt, 1, 65535);
        new server_1.Server(port);
    });
}
