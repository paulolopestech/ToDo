import { Tasks } from "./tasks"
import { Task } from "./types"

const mockTask: Task = {
    title: "Task 1",
    description: "This is a mock",
    status: "To do"
}

const mockInvalidTask: any = {
    title: "Task 1",
    description: "This is a invalid mock",
    status: 0,
}

const makeSut = () => new Tasks();


describe('Testing Tasks Class', () => {
    describe('Testing Create Task', () => {
        test('Should create a task', () => {
            const sut = makeSut();
            sut.createTask(mockTask);
            expect(sut.tasks.length).toBe(1);
        });
    })

    describe('Testing Create Task Validation', () => {
        test('Should return true if task is valid', () => {
            const sut = makeSut();
            const response = sut.validateCreateTask(mockTask);
            expect(response).toBe(true);
        });

        test('Should return false if task is invalid', () => {
            const sut = makeSut();
            const response = sut.validateCreateTask(mockInvalidTask);
            expect(response).toBe(false);
        });
    })
})