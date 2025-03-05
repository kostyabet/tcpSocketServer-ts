"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("./template");
let client;
createClient('127.0.0.1', 8800);
function createClient(ip, port) {
    client = new template_1.Client(ip, port);
    client.startServer();
}
