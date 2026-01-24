"use client";
import { getBlog } from "@/src/actions/blog.action";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  const [data, setData] = useState();
  const [error, setError] = useState<{ message: string } | null>(null );

  console.log(data);
  console.log(error);

  useEffect(() => {
    //* async IIFE ----> Immediately Invoked Function Expression
    (async () => {
      const { data, error } = await getBlog();
      setData(data);
      setError(error);
    })();
  }, []);

  return (
    <div>
      <h1>This is About page components</h1>
    </div>
  );
}

//  await new Promise((resolve) => setTimeout(resolve, 4000));
// throw new Error("Something went wrong");
