export const HOST = process.env.HOST;
export const DB_PORT = Number(process.env.DB_PORT);
export const DB_USER = process.env.DB_USER || 'dunkbing';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'Bingngan.';
export const DB_NAME = process.env.DB_NAME || 'checker_viet';
export const PORT = Number(process.env.PORT) || 3000;
export const PROD = Boolean(process.env.PRODUCTION) || false;