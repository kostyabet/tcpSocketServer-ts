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
const client_1 = require("./../server/client");
const clientVars = {
    exit: 1,
    send: 2,
};
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        const ipPrompt = "\t\t-- Client --\n\n" +
            "On which ip you want to connect?";
        const ipRegExt = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const ip = yield (0, menu_1.getStringFromConsole)(ipPrompt, ipRegExt);
        const portPromt = `On which port you want to connect?`;
        const port = yield (0, menu_1.getNumberFromConsole)(portPromt, 1, 65535, false);
        const client = new client_1.Client(ip, port);
        try {
            client.startServer();
            client._client.on('connect', () => __awaiter(this, void 0, void 0, function* () {
                let isNotDestroy = true;
                do {
                    const prompt = "\t    - Server commands -\n"
                        + `\t${clientVars.exit} - exit\t${clientVars.send} - send`;
                    const varient = yield (0, menu_1.getNumberFromConsole)(prompt, 1, 2);
                    switch (varient) {
                        case (clientVars.exit):
                            isNotDestroy = false;
                            break;
                        case (clientVars.send):
                            try {
                                const anyStringRegExt = /.*/;
                                const sendString = yield (0, menu_1.getStringFromConsole)("", anyStringRegExt, false);
                                client.sendMessage(sendString);
                            }
                            catch (msg) {
                                console.error(msg);
                                client.destroy();
                            }
                            break;
                    }
                } while (isNotDestroy);
                client.destroy();
            }));
        }
        catch (msg) {
            console.error(msg);
            client.destroy();
        }
    });
}
