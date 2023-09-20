import { Model } from "sequelize"
import { Either } from "../utils/either"
import ApplicationError from "./error/application.error"


export type CreateTaskResponse = Either<ApplicationError, Model>
export type GetTaskResponse = Either<ApplicationError, Model | null>