import { getNumberFromConsole } from "./menu";
import { Server } from './../server/server';

export default async function() {
    const portPromt = "\t\t-- Admin --\n\n"+
                      "On which you want to create server?"
    const port : number = await getNumberFromConsole(portPromt, 1, 65535);
    new Server(port);
}