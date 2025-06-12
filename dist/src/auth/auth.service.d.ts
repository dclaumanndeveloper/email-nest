import { UsersService, type User } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import type { UserSignin } from 'src/entity/userSignin';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signup(signup: User): Promise<{
        [x: string]: any;
        username: string;
        email: string;
        passwordHash: string;
        id?: string;
        isActive?: boolean;
        createdAt?: Date;
        updatedAt?: Date;
    }>;
    validateUser(email: string, pass: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    login(user: UserSignin): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string | undefined;
            username: string;
        };
    }>;
    refreshTokens(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
}
