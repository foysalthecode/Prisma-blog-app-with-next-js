import { cookies } from "next/headers";
import { env } from "../env";

const API_URL = env.API_URL;

export const blogService = {
  getBlogPost: async function () {
    try {
      const cookieStore = cookies();
      const res = await fetch(`${API_URL}/posts`, {
        headers: {
          cookie: (await cookieStore).toString(),
        },
      });
      const data = await res.json();
      console.log(data);
      //* this is an example is there was property exist named success
      //   if(data.succes){
      //     return {}
      //   }
      return { data: data, error: null };
    } catch (err) {
      console.log(err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
