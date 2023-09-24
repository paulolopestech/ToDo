import { Task } from "./types";

export class Tasks {
    public tasks: Array<Task> = [];

    validateCreateTask(task: Task) {
        if(!task.title) return false;
        if(typeof task.title !== "string") return false;
        if(!task.description) return false;
        if(typeof task.description !== "string") return false;
        if(!task.status) return false;
        if(typeof task.status !== "string") return false;
        return true;
      }
      
    createTask (task: Task) {
      this.tasks.push(task);
    }

    listTasks(): Task[] {
      return this.tasks;
  }

  deleteTask(index: number) {
    if (index >= 0 && index < this.tasks.length) {
        this.tasks.splice(index, 1);
        return true;
    }
    return false;
}

}