"use server";
import pino from "pino";

const logger = pino();

export const action = async () => {
  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
      cache: "no-store",
    });

    const json = await res.json();

    logger.info(json);
    logger.info(headers);

    return "ok";
  } catch {
    return "ng";
  }
};
