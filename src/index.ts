import { getNumberFromConsole } from "./console/menu";
import admin from "./console/admin";
import client from "./console/client";

const Roles = {
    admin: 1,
    client: 2
}

async function main() {
    const rolePrompt = "\t\tBelNet ^)\n\n"+
                       "Choose your role:\n" + 
                       `\t${Roles.admin} - Admin\t${Roles.client} - Client\n`
    const role = await getNumberFromConsole(rolePrompt, 1, 2);

    switch(role) {
        case(Roles.admin): 
            admin();
            break;
        case(Roles.client): 
            client();
            break;
    }
}

main();