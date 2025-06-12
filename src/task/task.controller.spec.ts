/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BadRequestException } from '@nestjs/common';
import type { Task } from '../entity/task';

// Mock TaskService
const mockTaskService = {
  getTasks: jest.fn(),
  getTaskById: jest.fn(),
  createTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
};

// Mock JwtAuthGuard
const mockJwtAuthGuard = {
  canActivate: jest.fn(() => true), // Assume guard always allows access for unit tests
};

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      const result: Task[] = [
        {
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
          status: 'waiting',
          userId: 'user1',
        },
      ];
      mockTaskService.getTasks.mockResolvedValue(result);

      expect(await controller.getTasks()).toBe(result);
      expect(service.getTasks).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTaskById', () => {
    it('should return a single task based on user id from request', async () => {
      const task: Task = {
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        status: 'waiting',
        userId: 'user1',
      };
      const mockReq = { user: { sub: 'user1' } };
      const taskIdParam = 'some-task-id'; // This param is currently unused in the controller logic

      mockTaskService.getTaskById.mockResolvedValue(task);

      expect(await controller.getTaskById(mockReq as any, taskIdParam)).toBe(
        task,
      );
      expect(service.getTaskById).toHaveBeenCalledWith(mockReq.user.sub);
      expect(service.getTaskById).toHaveBeenCalledTimes(1);
    });
  });

  describe('createTask', () => {
    it('should create and return a task', async () => {
      const newTaskDto: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
        title: 'New Task',
        description: 'New Description',
        status: 'waiting',
        userId: '', // Will be overwritten
      };
      const createdTask: Task = {
        id: '2',
        ...newTaskDto,
        userId: 'user1', // Should be set from req.user.sub
      };
      const mockReq = { user: { sub: 'user1' } };

      mockTaskService.createTask.mockResolvedValue(createdTask);

      const result = await controller.createTask(mockReq, newTaskDto as Task);

      expect(result).toBe(createdTask);
      expect(service.createTask).toHaveBeenCalledWith({
        ...newTaskDto,
        userId: mockReq.user.sub, // Verify userId is set from request
      });
      expect(service.createTask).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException if required fields are missing', async () => {
      const mockReq = { user: { sub: 'user1' } };
      const incompleteTask = { title: 'Incomplete' } as Task; // Missing description and status

      await expect(
        controller.createTask(mockReq, incompleteTask),
      ).rejects.toThrow(BadRequestException);
      expect(service.createTask).not.toHaveBeenCalled();
    });
  });

  describe('updateTask', () => {
    it('should update and return a task', async () => {
      const taskId = '1';
      const updateTaskDto: Partial<Task> = {
        title: 'Updated Task',
        status: 'done',
      };
      const updatedTask: Task = {
        id: taskId,
        title: 'Updated Task',
        description: 'Original Description',
        status: 'done',
        userId: 'user1',
      };

      mockTaskService.updateTask.mockResolvedValue(updatedTask);

      const result = await controller.updateTask(taskId, updateTaskDto as Task);

      expect(result).toBe(updatedTask);
      expect(service.updateTask).toHaveBeenCalledWith(taskId, updateTaskDto);
      expect(service.updateTask).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task and return a confirmation message', async () => {
      const taskId = '1';
      const expectedMessage = `Task #${taskId} deletada com sucesso!`;
      mockTaskService.deleteTask.mockResolvedValue(undefined); // deleteTask service method might not return anything

      const result = await controller.deleteTask(taskId);

      expect(result).toBe(expectedMessage);
      expect(service.deleteTask).toHaveBeenCalledWith(taskId);
      expect(service.deleteTask).toHaveBeenCalledTimes(1);
    });
  });
});
