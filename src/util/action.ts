"use server";
import { cookies } from "next/headers";
import pino from "pino";

const logger = pino();

export const action = async () => {
  try {
    const cookieStore = await cookies();
    logger.info(cookieStore.getAll());
    return "ok";
  } catch {
    return "ng";
  }
};
