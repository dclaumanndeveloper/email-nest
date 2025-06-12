"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const userSignup_1 = require("../entity/userSignup");
const auth_service_1 = require("./auth.service");
const userSignin_1 = require("../entity/userSignin");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const ZodValidationPipe_1 = require("../pipes/ZodValidationPipe");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async signIn(user) {
        const login = await this.authService.login(user);
        return { token: login, message: 'Login successful' };
    }
    async refresh(body) {
        return this.authService.refreshTokens(body.refresh_token);
    }
    async signUp(user) {
        const userCreate = {
            username: user.username,
            email: user.email,
            passwordHash: user.password,
        };
        const createdUser = await this.authService.signup(userCreate);
        return { message: 'Cadastrado com sucesso!', user: createdUser };
    }
    async getProfile(req) {
        const userId = req.user.sub;
        const profile = await this.authService.findById(userId);
        if (!profile) {
            throw new Error('User not found');
        }
        return profile;
    }
    async logout(req) {
        await this.authService.logout(req.user.sub);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signin'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', example: 'sample@email.com' },
                password: { type: 'string', example: 'password123' },
            },
            required: ['email', 'password'],
        },
        description: 'Login authentication',
        required: true,
    }),
    (0, common_1.UsePipes)(new ZodValidationPipe_1.ZodValidationPipe(userSignin_1.UserSchemaSignin)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', example: 'Sample User' },
                email: { type: 'string', example: 'teste@gmail.com' },
                password: { type: 'string', example: 'password123' },
            },
            required: ['username', 'email', 'password'],
        },
        description: 'User object to be created',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Cadastrado com sucesso!',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UsePipes)(new ZodValidationPipe_1.ZodValidationPipe(userSignup_1.UserSchemaSignup)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map