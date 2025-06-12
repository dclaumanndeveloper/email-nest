/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TaskSchema, type Task } from '../entity/task';
import { TaskService } from './task.service';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe';

/**
 * Controller responsible for handling incoming HTTP requests related to tasks.
 * It uses TaskService to interact with the task data.
 * All routes require JWT authentication via the JwtAuthGuard.
 * Base path: /tasks
 */
/**
 * Retrieves all tasks.
 * Requires JWT authentication.
 * @route GET /tasks
 * @returns {Promise<Task[]>} A promise that resolves to an array of Task objects.
 */
/**
 * Retrieves a specific task by its ID.
 * Requires JWT authentication.
 * Note: The current implementation uses the user ID from the request (`req.user.sub`)
 * instead of the provided task ID (`id`) to fetch the task.
 * @route GET /tasks/:id
 * @param {Request & { user: { sub: string } }} req - The incoming request object, containing user information.
 * @param {string} id - The ID of the task to retrieve (currently unused in the service call).
 * @returns {Promise<Task>} A promise that resolves to the Task object.
 */
/**
 * Creates a new task.
 * Requires JWT authentication.
 * The request body must contain 'title', 'description', and 'status'.
 * The userId for the task is automatically assigned from the authenticated user.
 * @route POST /tasks/create
 * @param {Request & { user: { sub: string } }} req - The incoming request object, used to extract the user ID.
 * @param {Task} task - The task data from the request body.
 * @returns {Promise<Task>} A promise that resolves to the newly created Task object.
 * @throws {BadRequestException} If 'title', 'description', or 'status' are missing in the request body.
 */
/**
 * Updates an existing task identified by its ID.
 * Requires JWT authentication.
 * The request body should contain the fields to be updated ('title', 'description', 'status').
 * @route PUT /tasks/:id
 * @param {string} id - The ID of the task to update.
 * @param {Task} task - The updated task data from the request body.
 * @returns {Promise<Task>} A promise that resolves to the updated Task object.
 * @HttpCode 204 No Content (Implicitly returns the updated task via the service, but the HTTP status is 204)
 */
/**
 * Deletes a task identified by its ID.
 * Requires JWT authentication.
 * @route DELETE /tasks/:id
 * @param {string} id - The ID of the task to delete.
 * @returns {Promise<string>} A promise that resolves to a confirmation message.
 * @HttpCode 204 No Content (Although it returns a message, the status code is set to 204)
 */
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('')
  async getTasks(): Promise<Task[]> {
    return await this.taskService.getTasks();
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get(':id')
  async getTaskById(
    @Request() req: Request & { user: { sub: string } },
    @Param('id') id: string,
  ): Promise<Task> {
    return await this.taskService.getTaskById(req.user.sub);
  }
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(TaskSchema))
  @Post('create')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Sample Task' },
        description: {
          type: 'string',
          example: 'Task description',
        },
        status: {
          type: 'string',
          enum: ['waiting', 'doing', 'done'],
          example: 'waiting',
        },
      },
      required: ['title', 'description'],
    },
    description: 'Task object to be created',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Task criada com sucesso!',
  })
  @HttpCode(201)
  async createTask(@Request() req, @Body() task: Task): Promise<Task> {
    task.userId = req.user.sub;
    return await this.taskService.createTask(task);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Sample Task' },
        description: { type: 'string', example: 'Task description' },
        status: {
          type: 'string',
          enum: ['waiting', 'doing', 'done'],
          example: 'waiting',
        },
      },
      required: ['title', 'description'],
    },
    description: 'Task object to be updated',
    required: true,
  })
  @Put(':id')
  @HttpCode(204)
  async updateTask(
    @Request() req,
    @Body(new ZodValidationPipe(TaskSchema)) task: Task,
    @Param('id') id: string,
  ): Promise<Task> {
    console.log('entrou no update');
    console.log(task);
    return await this.taskService.updateTask(id, task, req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete(':id')
  @HttpCode(204)
  async deleteTask(@Request() req, @Param('id') id: string): Promise<string> {
    await this.taskService.deleteTask(id, req.user.sub);
    return `Task #${id} deletada com sucesso!`;
  }
}
