import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  server_url: process.env.SERVER_URL,
  client_url: process.env.CLIENT_URL,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  ssl: {
    store_id: process.env.SSL_STORE_ID,
    store_pass: process.env.SSL_STORE_PASS,
    sslPaymentUrl: process.env.BASE_PAYMENT_URL,
    sslValidationUrl: process.env.BASE_VALIDATION_URL,
    transCharacters: process.env.TRANS_CHARACTERS,
  },
};
