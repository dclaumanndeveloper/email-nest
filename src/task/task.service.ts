import { BadRequestException, Injectable } from '@nestjs/common';
import type { Task } from '../entity/task';
import { db } from 'src/db';
import { tasks } from 'src/db/schema';
import { eq, and } from 'drizzle-orm';

@Injectable()
export class TaskService {
  async getTasks(): Promise<Task[]> {
    const tasksList = await db.select().from(tasks);
    return tasksList as Task[];
  }

  async getTaskById(id: string): Promise<Task> {
    const tasksList = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, id))
      .limit(1);
    return tasksList[0] as Task;
  }

  async createTask(task: Task): Promise<Task> {
    console.log('task', task);
    const [createdTask] = await db.insert(tasks).values(task).returning();
    return createdTask as Task;
  }

  async updateTask(id: string, task: Task, userId: string): Promise<Task> {
    console.log('entroun no serviço de update');
    if (!userId) {
      throw new BadRequestException('User ID is required to update task');
    }

    const [updatedTask] = await db
      .update(tasks)
      .set(task)
      .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
      .returning();
    console.log('updatedTask', updatedTask);
    return updatedTask as Task;
  }

  async deleteTask(id: string, userId: string): Promise<string> {
    await db
      .delete(tasks)
      .where(and(eq(tasks.id, id), eq(tasks.userId, userId)));
    return `Task #${id} deletada com sucesso`;
  }
}
