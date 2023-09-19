import express from 'express'
import HandleCreateTask from './services/task.create/create';
import { TasksSQLiteAdapter } from './adapters/tasks.sqlite';
import { Task } from './types/task';

const app = express();

app.post('/create', function (req, res) {
    const tasksRepository = new TasksSQLiteAdapter();
    const createTask= new HandleCreateTask(tasksRepository);
    
    const task: Task = req.body;
    const response = createTask.handle(task);
    res.send(response);
});

app.listen(3000, async () => {
    console.log('SERVER STARTED!');
});