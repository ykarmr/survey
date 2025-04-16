"use server";

export const action3 = async (obj: string) => {
  try {
    console.log(obj);

    return "ok";
  } catch (error) {
    console.log(error);
    return "ng";
  }
};
