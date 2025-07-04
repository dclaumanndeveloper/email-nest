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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    reflector;
    jwtService;
    constructor(reflector, jwtService) {
        super();
        this.reflector = reflector;
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = typeof request.headers['authorization'] === 'string'
            ? request.headers['authorization']
            : undefined;
        const token = authHeader?.split(' ')[1];
        if (typeof token !== 'string') {
            throw new common_1.UnauthorizedException('Acesso negado!');
        }
        const payload = this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET,
        });
        request.user = payload;
        const userId = request.user.sub;
        if (typeof userId !== 'string') {
            throw new common_1.UnauthorizedException('Invalid user ID in token');
        }
        const isAuthenticated = await this.verificationUser(token);
        if (isAuthenticated) {
            return !!request.user;
        }
        throw new common_1.UnauthorizedException('Acesso negado!');
    }
    async verificationUser(token) {
        if (!token) {
            throw new common_1.UnauthorizedException('Acesso negado!');
        }
        const userSessions = await db_1.db
            .select()
            .from(schema_1.sessions)
            .where((0, drizzle_orm_1.eq)(schema_1.sessions.token, token));
        const now = new Date();
        const allExpired = userSessions.length > 0 &&
            userSessions.every((session) => session.expiresIn <= now);
        if (allExpired) {
            await db_1.db.delete(schema_1.sessions).where((0, drizzle_orm_1.eq)(schema_1.sessions.token, token));
            throw new common_1.UnauthorizedException('Acesso negado! Todas as sessões expiraram.');
        }
        if (userSessions.length === 0) {
            throw new common_1.UnauthorizedException('No active sessions found for this user.');
        }
        return true;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Function, jwt_1.JwtService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map