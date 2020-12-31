export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    db_port: parseInt(process.env.DB_PORT, 10) || 5432,
    db_user: process.env.DB_USER || 'dunkbing',
    db_password: process.env.DB_PASSWORD || 'Bingngan.',
    db_name: process.env.DB_NAME || 'checker_viet',
    PROD: Boolean(process.env.PRODUCTION) || false,
  }
});