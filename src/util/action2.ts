"use server";

export const action2 = async (input: string) => {
  console.log(input);

  try {
    return "ok";
  } catch (error) {
    console.log(error);
    return "ng";
  }
};
