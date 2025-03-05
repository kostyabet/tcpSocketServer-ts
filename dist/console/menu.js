"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberFromConsole = getNumberFromConsole;
exports.getStringFromConsole = getStringFromConsole;
const inquirer_1 = __importDefault(require("inquirer"));
function getNumberFromConsole(prompt_1, min_1, max_1) {
    return __awaiter(this, arguments, void 0, function* (prompt, min, max, clear = true) {
        clear ? console.clear() : "";
        console.log(prompt);
        return yield readNumber(min, max);
    });
}
function getStringFromConsole(prompt_1, template_1) {
    return __awaiter(this, arguments, void 0, function* (prompt, template, clear = true) {
        clear ? console.clear() : "";
        console.log(prompt);
        return yield readString(template);
    });
}
function readString(template) {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer_1.default.prompt([
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
    });
}
function isIncorrectStringInput(str, reg) {
    return !reg.test(str);
}
function readNumber(min, max) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const answers = yield inquirer_1.default.prompt([
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
        return (_a = parseInt(answers.number)) !== null && _a !== void 0 ? _a : -1;
    });
}
function isIncorrectNumInput(num, min, max) {
    if (num == -1)
        return true;
    if (num < min || num > max)
        return true;
    return false;
}
