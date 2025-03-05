import inquirer from 'inquirer';

export async function getNumberFromConsole(prompt : string, min : number, max : number, clear : Boolean = true) : Promise<number> {
    clear ? console.clear() : "";
    console.log(prompt);
    return await readNumber(min, max);
}

export async function getStringFromConsole(prompt : string, template : RegExp, clear : Boolean = true) : Promise<string> {
    clear ? console.clear() : "";
    console.log(prompt);
    return await readString(template);
}

async function readString(template : RegExp) : Promise<string> {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'string',
            message: 'Please enter your varient:',
            validate: (input) => {
                return !isIncorrectStringInput(input, template);
            },
        },
    ]);

    return answers.string;
}

function isIncorrectStringInput(str : string, reg : RegExp) : Boolean {
    return !reg.test(str);
}

async function readNumber(min : number, max : number) : Promise<number> {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'number',
            message: 'Please enter your varient:',
            validate: (input) => {
                const number = parseInt(input);
                return !isNaN(number) && !isIncorrectNumInput(number, min, max);
            },
        },
    ]);

    return parseInt(answers.number) ?? -1;
}

function isIncorrectNumInput(num : number, min : number, max : number) : Boolean {
    if (num == -1)
        return true;

    if (num < min || num > max)
        return true;
    
    return false;
}