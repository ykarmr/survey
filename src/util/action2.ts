"use server";

export const action2 = async (path: string, init?: RequestInit | string) => {
  if (typeof init === "string") {
    init = JSON.parse(init) as RequestInit;
  }

  const url = "https://jsonplaceholder.typicode.com" + path;
  const method = init?.method ?? "GET";

  const headers = new Headers({
    ...init?.headers,
  });

  //   if (method === "POST") {
  //     headers.append("Content-Type", "application/json");
  //   }

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: headers,
      method: method,
      ...init,
    });
    const json = await res.json();
    console.log(json);

    return json;
  } catch (error) {
    console.log(error);
    return "ng";
  }
};
