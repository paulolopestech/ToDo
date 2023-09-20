import readline from "readline";
import { promisify } from "util";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
const userInput = promisify(rl.question).bind(rl);

async function getUserInput(prompt: string) {
    return await userInput(prompt);
}