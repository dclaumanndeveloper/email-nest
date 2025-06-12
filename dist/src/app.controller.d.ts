import { AuthService } from './auth/auth.service';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(req: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string | undefined;
            username: string;
        };
    }>;
    getProfile(req: {
        user: any;
    }): any;
}
