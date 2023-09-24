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
  const tasksInstance = new Tasks();
  while (true) {
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
        const task: Task = { title, description, status };
        const taskIsValid = tasksInstance.validateTask(task);
        if (taskIsValid) tasksInstance.createTask(task);
        else console.log('Os dados que você inseriu são inválidos, tente novamente!');
        break;

      case '2':
        console.log('=== Lista de Tarefas ===');
        tasksInstance.tasks.length > 0 ?
          tasksInstance.tasks.forEach((task, index) => {
            console.log(`Tarefa ${index + 1}:`);
            console.log(`Título: ${task.title}`);
            console.log(`Descrição: ${task.description}`);
            console.log(`Status: ${task.status}`);
            console.log('-------------------');
          }) :
          console.log('NENHUMA TAREFA ENCONTRADA!');
        break;

      case '3':
        console.log('=== Atualizar uma Tarefa ===');
        const taskIndex = parseInt(await getUserInput('Digite o número da tarefa que deseja atualizar: '), 10) - 1;
        if (isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasksInstance.tasks.length) {
          console.log('Índice de tarefa inválido.');
        } else {
          const updatedTask = tasksInstance.tasks[taskIndex];

          const updatedTitle = await getUserInput('Digite o novo título da tarefa: ');
          if (updatedTitle) {
            updatedTask.title = updatedTitle;
          }

          const updatedDescription = await getUserInput('Digite a nova descrição da tarefa: ');
          if (updatedDescription) {
            updatedTask.description = updatedDescription;
          }

          const updatedStatus = await getUserInput('Digite o novo status da tarefa: ');
          if (updatedStatus) {
            updatedTask.status = updatedStatus;
          }
          const taskIsValid = tasksInstance.validateTask(updatedTask);
          if (taskIsValid) tasksInstance.update(taskIndex, updatedTask);
          else console.log('Os dados que você inseriu são inválidos, tente novamente!');

          console.log('TAREFA ATUALIZADA COM SUCESSO!');
        }
        break;

      case '4':
        console.log('=== Excluir uma Tarefa ===');
        const taskIndexToDelete = parseInt(await getUserInput('Digite o número da tarefa que deseja excluir: '), 10) - 1;
        if (isNaN(taskIndexToDelete) || taskIndexToDelete < 0 || taskIndexToDelete >= tasksInstance.tasks.length) {
          console.log('Índice de tarefa inválido.');
        } else {
          tasksInstance.tasks.splice(taskIndexToDelete, 1);
          console.log('Tarefa excluída com sucesso.');
        }
        break;

      default:
        console.log('Fechando aplicação');
        rl.close()
        return;
    }
  }
}

cmdApp();