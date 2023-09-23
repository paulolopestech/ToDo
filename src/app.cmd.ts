import readline from "readline";
import { promisify } from "util";
import { Task } from "./types";
import { Tasks } from "./tasks";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const userInput = promisify(rl.question).bind(rl);

async function getUserInput(prompt: string): Promise<any> {
    return userInput(prompt);
}

async function cmdApp() {
  const tasks = new Tasks();
  while(true) {
    console.log('1 - Criar uma nova tarefa');
    console.log('2 - Listar Tarefas');
    console.log('3 - Atualizar uma tarefa');
    console.log('4 - Excluir uma tarefa');
    console.log('5 - Encerrar aplicação\n');

    const option: string = await getUserInput('Escolha uma opção: ');
    switch (option) {
      case '1':
        const title = await getUserInput('Digite o nome da tarefa: ');
        const description = await getUserInput('Descreva a tarefa: ');
        const status = await getUserInput('Digite o status da tarefa: ');
        const task: Task = {title, description, status};
        const taskIsValid = tasks.validateCreateTask(task);
        if(taskIsValid) tasks.createTask(task);
        else console.log('Os dados que você inseriu são inválidos, tente novamente!');
        break;
    
      default:
        console.log('Fechando aplicação');
        rl.close()
        return;
    }
    console.clear();
  }
}

cmdApp();