import { Injectable } from '@nestjs/common';
import { db } from 'src/db';
import { users } from 'src/db/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
export interface User {
  [x: string]: any;
  username: string;
  email: string;
  passwordHash: string;
  id?: string;
  //  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable()
export class UsersService {
  async create(user: User): Promise<User> {
    user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
    const [createUsers] = await db.insert(users).values(user).returning();
    return createUsers;
  }
  async findOne(email: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    return result[0];
  }

  async findById(id: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return result[0];
  }
}
