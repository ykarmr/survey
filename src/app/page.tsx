"use client";

import { action } from "@/util/action";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState<null | "ok" | "ng">("ok");

  const onclick = async () => {
    const state = await action();
    setState(state);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={onclick}>TEST</button>
      <hr />
      {state === "ok" ? (
        <div className="text-green-500">ok</div>
      ) : state === "ng" ? (
        <div className="text-red-500">ng</div>
      ) : (
        <div className="text-gray-500">null</div>
      )}
    </div>
  );
}
