import * as net from 'net';

export class Client {
    _client;
    _ip;
    _port;

    constructor (ip : string, port : number) {
        this._client = new net.Socket();
        this._ip = ip;
        this._port = port;

        this._client.on('error', (err) => {
            console.error(err.message);
        });
    }

    destroy () {
        this._client.destroy();
    }

    public startServer() {
        this._client.connect(this._port, this._ip, () => {
            // console.log('Connected to server');
        })

        this._client.on('data', (data) => {
            // console.log(`Received: ${data}`);
        });
        
        this._client.on('close', () => {
            console.log('Connection closed');
        });
    }

    public sendMessage(message: string) {
        if (this._client.writable) {
            this._client.write(message);
        }
    }
}