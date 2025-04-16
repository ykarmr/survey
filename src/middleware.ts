import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { v7 as uuidv7 } from "uuid";
import { getJstString } from "./util/date";
import { PATH_HEADER, REQUEST_ID_HEADER } from "./util/const";

export async function middleware(req: NextRequest) {
  /**
   * 以下のパスに一致するか
   * /api/*
   * /healthcheck/status
   * /_next/static
   * /favicon.ico
   * /sitemap.xml
   * /robots.txt
   * /assets/*
   * /manual/*
   * /pages/*
   * /mockServiceWorker.js
   */
  const regex = new RegExp(
    "/((api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets|manual|pages|mockServiceWorker.js).*)"
  );

  const requestHeaders = new Headers(req.headers);
  const reqId = uuidv7();
  const path = req.nextUrl.pathname + req.nextUrl.search;
  requestHeaders.set(REQUEST_ID_HEADER, reqId);
  requestHeaders.set(PATH_HEADER, path);

  if (!regex.test(req.nextUrl.pathname)) {
    // 静的資材や/api/*以外のログを出力する
    console.log(
      JSON.stringify({
        level: "info",
        datetime: getJstString(),
        msg: "request received",
        reqId,
        path,
      })
    );
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
