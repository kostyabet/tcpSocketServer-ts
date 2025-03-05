"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const net = __importStar(require("net"));
class Client {
    constructor(ip, port) {
        this._client = new net.Socket();
        this._ip = ip;
        this._port = port;
        this._client.on('error', (err) => {
            throw new Error(err.message);
        });
    }
    destroy() {
        this._client.destroy();
    }
    startServer() {
        this._client.connect(this._port, this._ip, () => {
            // console.log('Connected to server');
        });
        this._client.on('data', (data) => {
            // console.log(`Received: ${data}`);
        });
        this._client.on('close', () => {
            console.log('Connection closed');
        });
    }
    sendMessage(message) {
        if (this._client.writable) {
            this._client.write(message);
        }
    }
}
exports.Client = Client;
