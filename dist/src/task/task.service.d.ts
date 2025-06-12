import type { Task } from '../entity/task';
export declare class TaskService {
    getTasks(): Promise<Task[]>;
    getTaskById(id: string): Promise<Task>;
    createTask(task: Task): Promise<Task>;
    updateTask(id: string, task: Task, userId: string): Promise<Task>;
    deleteTask(id: string, userId: string): Promise<string>;
}
