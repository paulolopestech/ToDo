import TasksRepository from "../../ports/tasks"
import HandleCreateTask from "./create"
import ApplicationError from '../../types/error/application.error';
import { Task } from '../../types/task';
import { Either } from '../../utils/either';
import { Model } from 'sequelize';

describe('Testing Tasks Creation', () => {
    const taskMock: Task ={
        title: 'Teste',
        description: 'teste',
        status: 'doing',
        targetDate: '18/09'
    }
    const taskResponseMock: any = {
        id: '358e19cb-fc04-4d23-aa72-fa0e06a8bbc2',
        title: 'Teste',
        description: 'teste',
        status: 'doing',
        targetDate: '18/09',
        updatedAt: '2023-09-20T23:01:56.492Z',
        createdAt: '2023-09-20T23:01:56.492Z'
    }

    const makeAdapter = (returnValue: any) => 
        new class DatabaseMockAdapter implements TasksRepository{
            create(task: Task): Promise<any> {
                return returnValue;
            }
            get(id: string): Promise<Either<ApplicationError, Model>> {
                return returnValue;
            }
        }

    test('Should create a task', async () => {
        const tasksRepository = makeAdapter(taskResponseMock);
        const handleCreateTask = new HandleCreateTask(tasksRepository);
        const response = await handleCreateTask.handle(taskMock);
        expect(response).toEqual(taskResponseMock)
    })
})