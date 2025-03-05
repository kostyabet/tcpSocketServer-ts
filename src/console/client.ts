import { getNumberFromConsole, getStringFromConsole } from "./menu";
import { Client } from './../server/client';

const clientVars = {
    exit: 1,
    send: 2,
}

export default async function() {
    const ipPrompt = "\t\t-- Client --\n\n"+
                     "On which ip you want to connect?"
    const ipRegExt : RegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ip : string = await getStringFromConsole(ipPrompt, ipRegExt);

    const portPromt = `On which port you want to connect?`
    const port : number = await getNumberFromConsole(portPromt, 1, 65535, false);
    
    const client = new Client(ip, port);
    client.startServer();
    client._client.on('connect', async () => {
        let isNotDestroy : Boolean = true;
        do {
            const prompt = "\t    - Server commands -\n" 
                        + `\t${clientVars.exit} - exit\t${clientVars.send} - send`
            const varient = await getNumberFromConsole(prompt, 1, 2);
            switch (varient) {
                case (clientVars.exit):
                    isNotDestroy = false;
                    break;
                case (clientVars.send):
                    const anyStringRegExt: RegExp = /.*/;
                    const sendString = await getStringFromConsole("", anyStringRegExt, false);
                    client.sendMessage(sendString);
                    break;
            }
        } while (isNotDestroy);
        client.destroy();
    })
}