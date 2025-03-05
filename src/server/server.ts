import * as net from 'net';

interface AddressInUseError extends Error {
    code?: string;
}

export class Server {
    private _port;
    private _server : any;

    constructor (port : number) {
        this._port = port;
        this.checkPortAvailability()
            .then(() => this.createServer())
            .catch((err) => {
                console.error(err.message)
            });
    }

    private checkPortAvailability(): Promise<void> {
        return new Promise((resolve, reject) => {
            const server = net.createServer();

            server.unref();
            server.on('error', (err: AddressInUseError) => {
                if (err.code === 'EADDRINUSE') {
                    reject(new Error(`Port ${this._port} is already in use`));
                } else {
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

    private createServer() {
        this._server = net.createServer((socket) => {
            console.log('Client connected');

            socket.on('data', (data) => {
                console.log(`Received: ${data}`);
                socket.write(`Server received your ${data}!`);
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