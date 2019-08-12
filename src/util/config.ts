import * as dotenv from "dotenv";
dotenv.config();

export const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
export const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
export const AMAZON_SNS_APPLICATION_PLATFORM_ARN =
  process.env.AMAZON_SNS_APPLICATION_PLATFORM_ARN;
