"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
let client;
createClient('127.0.0.1', 8800);
function createClient(ip, port) {
    client = new server_1.Client(ip, port);
    client.startServer();
}
