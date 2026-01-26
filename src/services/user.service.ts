import { cookies } from "next/headers";
import { env } from "../env";

const AUTH_URL = env.AUTH_URL;

//* No dynamic and No {Cache no-store} : SSG - static page
//* {Cache no-store} : SSR - Dynamic page
//* next: { revalidate: 10 } : ISR - Mix Between Static and Dynamic

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing" } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "something went wrong" } };
    }
  },
};
