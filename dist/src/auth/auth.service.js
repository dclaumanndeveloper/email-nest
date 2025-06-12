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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const bcrypt_1 = require("bcrypt");
const env_1 = require("../env");
const drizzle_orm_1 = require("drizzle-orm");
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signup(signup) {
        db_1.db.query.tracks.findMany({});
        const userExists = await db_1.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.email, signup.email))
            .limit(1)
            .then((res) => res[0]);
        if (userExists) {
            throw new common_1.BadRequestException('Email já cadastrado');
        }
        const user = await this.usersService.create(signup);
        const { ...result } = user;
        return result;
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findOne(email);
        if (!user || typeof user.passwordHash !== 'string') {
            throw new common_1.BadRequestException('Usuário ou senha inválidos');
        }
        const match = await bcrypt_1.default.compare(pass, user.passwordHash);
        if (!match) {
            return null;
        }
        const { passwordHash, ...result } = user;
        return result;
    }
    async findById(id) {
        const user = await this.usersService.findById(id);
        if (!user)
            throw new Error('User not found');
        if (!user.isActive)
            throw new Error('User is not active');
        const { ...result } = user;
        return result;
    }
    async login(user) {
        const validatedUser = await this.validateUser(user.email, user.password);
        if (!validatedUser) {
            throw new common_1.UnauthorizedException('Usuário ou senha inválidos');
        }
        const payload = {
            sub: validatedUser.id,
            username: validatedUser.username,
            email: validatedUser.email,
        };
        const { id, username, email } = validatedUser;
        const jwtSecret = process.env.JWT_SECRET || env_1.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not set in environment variables');
        }
        const access_token = this.jwtService.sign(payload, {
            expiresIn: '15m',
            secret: jwtSecret,
        });
        const refresh_token = this.jwtService.sign(payload, {
            expiresIn: '7d',
            secret: jwtSecret,
        });
        const session = await db_1.db
            .insert(schema_1.sessions)
            .values({
            userId: id,
            token: access_token,
            refreshToken: refresh_token,
            expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })
            .returning();
        return { access_token, refresh_token, user: { id, username } };
    }
    async refreshTokens(refreshToken) {
        const session = await db_1.db
            .select()
            .from(schema_1.sessions)
            .where((0, drizzle_orm_1.eq)(schema_1.sessions.refreshToken, refreshToken))
            .limit(1)
            .then((res) => res[0]);
        if (!session) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_SECRET || env_1.env.JWT_SECRET,
            });
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const newAccessToken = await this.jwtService.signAsync({ sub: payload.sub, username: payload.username, email: payload.email }, { expiresIn: '15m', secret: process.env.JWT_SECRET || env_1.env.JWT_SECRET });
        const newRefreshToken = await this.jwtService.signAsync({ sub: payload.sub, username: payload.username, email: payload.email }, { expiresIn: '7d', secret: process.env.JWT_SECRET || env_1.env.JWT_SECRET });
        await db_1.db.delete(schema_1.sessions).where((0, drizzle_orm_1.eq)(schema_1.sessions.refreshToken, refreshToken));
        await db_1.db.insert(schema_1.sessions).values({
            userId: payload.sub,
            token: newAccessToken,
            refreshToken: newRefreshToken,
            expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        return {
            access_token: newAccessToken,
            refresh_token: newRefreshToken,
        };
    }
    async logout(userId) {
        await db_1.db.delete(schema_1.sessions).where((0, drizzle_orm_1.eq)(schema_1.sessions.userId, userId));
        return { message: 'Logged out successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map