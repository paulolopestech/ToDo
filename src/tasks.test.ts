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
            const response = sut.validateCreateTask(mockTask);
            expect(response).toBe(true);
        });

        test('Should return false if task is invalid', () => {
            const sut = makeSut();
            const response = sut.validateCreateTask(mockInvalidTask);
            expect(response).toBe(false);
        });
    })

    describe('Testing List Tasks', () => {
        test('Should list tasks', () => {
            const sut = makeSut();
            sut.createTask(mockTask);
    
            // Redirect console.log to capture the output
            const logSpy = jest.spyOn(console, 'log');
            const expectedOutput = [
                '=== Lista de Tarefas ===',
                'Tarefa 1:',
                'Título: Task 1',
                'Descrição: This is a mock',
                'Status: To do',
                '-------------------'
            ].join('\n');
    
            // Call the listTasks method
            sut.listTasks();
    
            // Check if the console.log was called with the expected output
            expect(logSpy).toHaveBeenCalledWith(expectedOutput);
        });
    
        test('Should list tasks even if empty', () => {
            const sut = makeSut();
    
            // Redirect console.log to capture the output
            const logSpy = jest.spyOn(console, 'log');
            const expectedOutput = '=== Lista de Tarefas ===';
    
            // Call the listTasks method
            sut.listTasks();
    
            // Check if the console.log was called with the expected output
            expect(logSpy).toHaveBeenCalledWith(expectedOutput);
        });
    });

})

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

