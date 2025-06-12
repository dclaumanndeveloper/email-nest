import { type UserSignup } from 'src/entity/userSignup';
import { AuthService } from './auth.service';
import { type UserSignin } from 'src/entity/userSignin';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(user: UserSignin): Promise<{
        token: any;
        message: string;
    }>;
    refresh(body: {
        refresh_token: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    signUp(user: UserSignup): Promise<{
        message: string;
        user: {
            [x: string]: any;
            username: string;
            email: string;
            passwordHash: string;
            id?: string;
            isActive?: boolean;
            createdAt?: Date;
            updatedAt?: Date;
        };
    }>;
    getProfile(req: {
        user: {
            sub: string;
        };
    }): Promise<any>;
    logout(req: {
        user: {
            sub: string;
        };
    }): Promise<void>;
}
