import { Tasks } from "../models/tasks.models";
import TasksRepository from "../ports/tasks";
import { Task } from "../types/task";
import { Either, error, success } from "../utils/either";
import databaseConnection from "./sqlite.connection";
import ApplicationError from "../types/error/application.error";
import { ErrorTypes } from "../types/error/error.types";

export class TasksSQLiteAdapter implements TasksRepository {
    static async initDataBase(): Promise<void> {
        await databaseConnection.authenticate();
    }
    async create(task: Task): Promise<Either<ApplicationError, any>> {
        try {
            await databaseConnection.sync();
            await Tasks.create(task);
            return success('');
        } catch (e) {
            console.log(ErrorTypes.DATABASE_ERROR, 'src/adapters/tasks.sqlite.ts, create')
            return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, `Error creating data: ${e}`));
        }
    }

    async read(id: string): Promise<Either<ApplicationError, any>> {
        try {
            await databaseConnection.sync();
            const task = await Tasks.findByPk(id);
            return success(task);
        } catch (e) {
            console.log(ErrorTypes.DATABASE_ERROR, 'src/adapters/tasks.sqlite.ts, read')
            return error(new ApplicationError(ErrorTypes.DATABASE_ERROR, `Error reading data: ${e}`));
        }
    }
}