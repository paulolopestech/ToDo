import ApplicationError from "../types/error/application.error";
import { Task } from "../types/task";
import { Either } from "../utils/either";

export default interface TasksRepository {
    create(task: Task) : Promise<any>;
    read(id: string): Promise<Either<ApplicationError, Task>>;
}