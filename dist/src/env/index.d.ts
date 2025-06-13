import 'dotenv/config';
export declare const env: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    NODE_ENV: "dev" | "test" | "prod";
    PORT: number;
    AUTH_SECRET: string;
    RESEND_API_KEY?: string | undefined;
};
