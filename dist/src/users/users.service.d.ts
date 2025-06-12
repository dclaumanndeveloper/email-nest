export interface User {
    [x: string]: any;
    username: string;
    email: string;
    passwordHash: string;
    id?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class UsersService {
    create(user: User): Promise<User>;
    findOne(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
}
