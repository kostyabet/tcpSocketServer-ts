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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = require("./console/menu");
const admin_1 = __importDefault(require("./console/admin"));
const client_1 = __importDefault(require("./console/client"));
const Roles = {
    admin: 1,
    client: 2
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const rolePrompt = "\t\tBelNet ^)\n\n" +
            "Choose your role:\n" +
            `\t${Roles.admin} - Admin\t${Roles.client} - Client\n`;
        const role = yield (0, menu_1.getNumberFromConsole)(rolePrompt, 1, 2);
        switch (role) {
            case (Roles.admin):
                (0, admin_1.default)();
                break;
            case (Roles.client):
                (0, client_1.default)();
                break;
        }
    });
}
main();
