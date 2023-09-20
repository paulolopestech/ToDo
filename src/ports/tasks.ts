import { Task } from "../types/task";
import { CreateTaskResponse, GetTaskResponse } from "../types/responses";

export default interface TasksRepository {
    create(task: Task) : Promise<CreateTaskResponse>;
    get(id: string): Promise<GetTaskResponse>;
}