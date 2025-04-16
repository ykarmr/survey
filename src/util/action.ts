"use server";
import { cookies } from "next/headers";

import "server-only";
// import { getLogger } from "./logger";

type Result<T> = Success<T> | Failure;

interface Success<T> {
  isOk: true;
  data: T;
}

interface Failure {
  isOk: false;
}

type QueryParams = Record<string, string | number>;

function toQueryString(params: QueryParams): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null || value !== undefined) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
}

type CustomRequestInit = RequestInit & {
  query?: QueryParams;
};

/**
 * サーバー側でHTTPリクエストを行う非同期関数
 * ※ try, catch の try の中で redirect 関数を実行するとエラーが発生するので Result 型を返すようにしている
 *
 * @param path - リクエスト先のPATH
 * @param init - fetch 関数の初期化オプション（任意）
 * @returns 成功時はデータ（T型）を含む Result、失敗時は Error を含む Result を返す
 */
export async function request<T>(
  path: string,
  init?: CustomRequestInit
): Promise<Result<T>> {
  // const logger = await getLogger();

  let url = "https://jsonplaceholder.typicode.com" + path;
  const query = init?.query;
  if (query) {
    url = url + `?${toQueryString(query)}`;
  }

  const method = init?.method ?? "GET";

  try {
    const cookieStore = await cookies();
    const vtkt = cookieStore.get("VTKT");

    const headers = new Headers({
      ...init?.headers,
    });

    if (method === "POST") {
      headers.append("Content-Type", "application/json");
    }

    if (vtkt) {
      headers.append("Tanuki-Vtkt", vtkt.value);
    }

    // リクエストログ
    // logger.info({
    //   msg: `${method} ${path} request`,
    // });

    let body;
    if (method === "POST") {
      // Tanuki-BEのバリデーションの都合で、空オブジェクトを渡している
      body = init?.body ?? JSON.stringify({});
    }

    const res = await fetch(url, {
      cache: "no-store",
      headers: headers,
      method,
      body,
      ...init,
    });

    // ステータスコードが 400 ~ 599の場合
    if (res.status >= 400 && res.status <= 599) {
      const logObj = {
        msg: `${method} ${path} response received`,

        status: res.status,
      };

      // ステータスコードが 400 ~ 499の場合は、警告にする
      if (res.status <= 499) {
        // API警告レスポンスログ
        // logger.warn(logObj);
      } else {
        // ステータスコードが 500 ~ 599の場合は、エラーにする
        // logger.error(logObj);
      }

      return {
        isOk: false,
      };
    }

    const data = (await res.json()) as T;

    // APIレスポンス正常ログ
    // logger.info({
    //   msg: `${method} ${path} response received`,
    //   result: data,
    //   status: res.status,
    // });

    return {
      isOk: true,
      data,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      // ネットワークや環境による通信失敗
      // logger.error({
      //   msg: `Exception Error: ${error.message}`,
      //   error,
      // });

      return {
        isOk: false,
      };
    }

    // 予期せぬエラー
    // logger.error({
    //   msg: `Unknown error`,
    //   error,
    // });

    return {
      isOk: false,
    };
  }
}
