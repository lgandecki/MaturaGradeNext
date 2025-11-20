"use client";

import { useState, useTransition } from "react";
import { greetAction } from "@/app/actions/pure-greet-action";

export function PureGreet() {
  const [result, setResult] = useState<{ data?: { message: string }; serverError?: Error }>({});
  const [, startTransition] = useTransition();

  const execute = (input: { name: string }) => {
    startTransition(async () => {
      try {
        const data = await greetAction(input);
        setResult({ data });
      } catch (error) {
        setResult({ serverError: error as Error });
      }
    });
  };

  const reset = () => setResult({});

  return (
    <div>
      <button onClick={() => execute({ name: "John Doe" })}>Click here</button>
      <button onClick={reset}>Reset</button>
      {result.data && <p>{result.data.message}</p>}
      {result.serverError && <p>Error: {result.serverError.message}</p>}
    </div>
  );
}
