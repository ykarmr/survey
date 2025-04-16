"use server";
import pino from "pino";

const logger = pino();

export const action = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
      cache: "no-store",
    });

    const json = await res.json();

    logger.info(json);
    return "ok";
  } catch {
    return "ng";
  }
};
