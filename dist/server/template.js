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
exports.Client = exports.Server = void 0;
const net = __importStar(require("net"));
class Server {
    constructor(port) {
        this._port = port;
        this.checkPortAvailability()
            .then(() => this.createServer())
            .catch((err) => {
            console.error(err.message);
        });
    }
    checkPortAvailability() {
        return new Promise((resolve, reject) => {
            const server = net.createServer();
            server.unref();
            server.on('error', (err) => {
                if (err.code === 'EADDRINUSE') {
                    reject(new Error(`Port ${this._port} is already in use`));
                }
                else {
                    reject(new Error(`Error checking port ${this._port}: ${err.message}`));
                }
            });
            server.listen(this._port, () => {
                server.close(() => {
                    resolve();
                });
            });
        });
    }
    createServer() {
        this._server = net.createServer((socket) => {
            socket.on('data', (data) => {
                console.log(`Received: ${data}`);
                socket.write('Server received your data!');
            });
            socket.on('close', () => {
                console.log('Client disconnected');
            });
        });
        this._server.listen(this._port, () => {
            console.log(`TCP server is running on port ${this._port}`);
        });
        process.on('SIGINT', () => {
            if (this._server)
                this._server.close(() => {
                    console.log('Server closed.');
                });
        });
    }
}
exports.Server = Server;
class Client {
    constructor(ip, port) {
        this._client = new net.Socket();
        this._ip = ip;
        this._port = port;
    }
    destroy() {
        this._client.destroy();
    }
    startServer() {
        this._client.connect(this._port, this._ip, () => {
            console.log('Connected to server');
            this._client.write('Hello, server!');
        });
        this._client.on('data', (data) => {
            console.log(`Received: ${data}`);
            this.destroy();
        });
        this._client.on('close', () => {
            console.log('Connection closed');
        });
    }
}
exports.Client = Client;
