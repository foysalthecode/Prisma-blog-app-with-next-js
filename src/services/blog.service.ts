import { cookies } from "next/headers";
import { env } from "../env";
import { BlogData } from "../types";

const API_URL = env.API_URL;

interface serviceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
  page?: string;
}

export const blogService = {
  getBlogPost: async function (
    params?: GetBlogsParams,
    options?: serviceOptions,
  ) {
    try {
      const cookieStore = cookies();
      const url = new URL(`${API_URL}/posts`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value != undefined && value != null && value != "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config, tags: ["blogPosts"] };

      // const res = await fetch(url.toString(), {
      //   ...config,
      //   headers: {
      //     cookie: (await cookieStore).toString(),
      //   },
      //   next: {
      //     tags: ["blogPosts"],  // this line is alternative for line 42
      //   },
      // });
      const res = await fetch(url.toString(), {
        ...config,
        headers: {
          cookie: (await cookieStore).toString(),
        },
      });
      const data = await res.json();
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

  getBlogPostById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      console.log(err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  createBlogPost: async (blogData: BlogData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Unable to Post blog" },
        };
      }
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
