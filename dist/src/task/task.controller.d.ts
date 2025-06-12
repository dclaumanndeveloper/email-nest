import { type Task } from '../entity/task';
import { TaskService } from './task.service';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getTasks(): Promise<Task[]>;
    getTaskById(req: Request & {
        user: {
            sub: string;
        };
    }, id: string): Promise<Task>;
    createTask(req: any, task: Task): Promise<Task>;
    updateTask(req: any, task: Task, id: string): Promise<Task>;
    deleteTask(req: any, id: string): Promise<string>;
}
