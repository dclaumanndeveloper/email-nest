"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
let TaskService = class TaskService {
    async getTasks() {
        const tasksList = await db_1.db.select().from(schema_1.tasks);
        return tasksList;
    }
    async getTaskById(id) {
        const tasksList = await db_1.db
            .select()
            .from(schema_1.tasks)
            .where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id))
            .limit(1);
        return tasksList[0];
    }
    async createTask(task) {
        console.log('task', task);
        const [createdTask] = await db_1.db.insert(schema_1.tasks).values(task).returning();
        return createdTask;
    }
    async updateTask(id, task, userId) {
        console.log('entroun no serviço de update');
        if (!userId) {
            throw new common_1.BadRequestException('User ID is required to update task');
        }
        const [updatedTask] = await db_1.db
            .update(schema_1.tasks)
            .set(task)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.tasks.id, id), (0, drizzle_orm_1.eq)(schema_1.tasks.userId, userId)))
            .returning();
        console.log('updatedTask', updatedTask);
        return updatedTask;
    }
    async deleteTask(id, userId) {
        await db_1.db
            .delete(schema_1.tasks)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.tasks.id, id), (0, drizzle_orm_1.eq)(schema_1.tasks.userId, userId)));
        return `Task #${id} deletada com sucesso`;
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)()
], TaskService);
//# sourceMappingURL=task.service.js.map