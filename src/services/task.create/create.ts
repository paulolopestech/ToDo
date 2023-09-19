import TasksRepository from "../../ports/tasks";
import { Task } from "../../types/task";

export default class HandleCreateTask {
    constructor(
        private tasksRepository: TasksRepository,
    ) {};

    async handle(task: Task): Promise<any> {
        const response = await this.tasksRepository.create(task);
        return response;
    }
}