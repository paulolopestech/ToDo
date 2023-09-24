import { Tasks } from "./tasks"
import { Task } from "./types"

const mockTask: Task = {
    title: "Task 1",
    description: "This is a mock",
    status: "To do"
}

const mockUpdateTask: Task = {
    title: "Updated Task 1",
    description: "This is a updated mock",
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
            const response = sut.validateTask(mockTask);
            expect(response).toBe(true);
        });

        test('Should return false if task is invalid', () => {
            const sut = makeSut();
            const response = sut.validateTask(mockInvalidTask);
            expect(response).toBe(false);
        });
    })

    describe('Testing List Tasks', () => {
        test('Should list tasks', () => {
            const sut = makeSut();
            sut.createTask(mockTask);
            const response = sut.listTasks();
            expect(response).toEqual([mockTask]);
        });

        test('Should list tasks even if empty', () => {
            const sut = makeSut();
            const response = sut.listTasks();
            expect(response.length).toBe(0);
        });
    });

    describe('Testing Update Task', () => {
        test('Should return an Array', () => {
            const sut = makeSut();
            sut.createTask(mockTask);
            const response = sut.update(0, mockUpdateTask);
            expect(response.title).toBe(mockUpdateTask.title);
            expect(response.description).toBe(mockUpdateTask.description);
            expect(response.status).toBe(mockUpdateTask.status);
        });
    });

    describe('Testing Delete Task', () => {
        test('Should delete a task', () => {
            const sut = makeSut();
            sut.createTask(mockTask);
            sut.deleteTask(0);
            expect(sut.tasks.length).toBe(0);
        });

        test('Should not delete a task if index is out of range', () => {
            const sut = makeSut();
            sut.createTask(mockTask);
            const initialLength = sut.tasks.length;
            sut.deleteTask(1);  // Index out of range
            expect(sut.tasks.length).toBe(initialLength);
        });
    });

});