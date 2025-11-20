"use client";

import { useAction } from "next-safe-action/hooks";
import { greetAction } from "@/app/actions/greet-action";

export function Greet() {
  const { execute, result, reset } = useAction(greetAction);

  return (
    <div>
      <button onClick={() => execute({ name: "John Doe" })}>Click here</button>
      <button onClick={() => reset()}>Reset</button>
      {result.data && <p>{result.data.message}</p>}
      {result.serverError && <p>Error: {result.serverError}</p>}
    </div>
  );
}
