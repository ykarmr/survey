"use server";
import { cookies } from "next/headers";

export const action = async () => {
  try {
    console.log((await cookies()).getAll());
    return "ok";
  } catch {
    return "ng";
  }
};
