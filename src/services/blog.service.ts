import { cookies } from "next/headers";
import { env } from "../env";

const API_URL = env.API_URL;

interface serviceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
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

      const res = await fetch(url.toString(), {
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
};

// import { env } from "../env";

// const API_URL = env.API_URL;

// //* No Dynamic and No { cache: no-store } : SSG -> Static Page
// //* { cache: no-store } : SSR -> Dynamic Page
// //* next: { revalidate: 10 } : ISR -> Mix between static and dynamic

// interface ServiceOptions {
//   cache?: RequestCache;
//   revalidate?: number;
// }

// interface GetBlogsParams {
//   isFeatured?: boolean;
//   search?: string;
// }

// export const blogService = {
//   getBlogPosts: async function (
//     params?: GetBlogsParams,
//     options?: ServiceOptions,
//   ) {
//     try {
//       const url = new URL(`${API_URL}/posts`);
//       const cookieStore = cookies();
//       if (params) {
//         Object.entries(params).forEach(([key, value]) => {
//           if (value !== undefined && value !== null && value !== "") {
//             url.searchParams.append(key, value);
//           }
//         });
//       }

//       const config: RequestInit = {};

//       if (options?.cache) {
//         config.cache = options.cache;
//       }

//       if (options?.revalidate) {
//         config.next = { revalidate: options.revalidate };
//       }

//       const res = await fetch(url.toString(), {
//         ...config,
//         headers: {
//           cookie: (await cookieStore).toString(),
//         },
//         credentials: "include",
//       });

//       console.log(res);

//       const data = await res.json();

//       // This is an example
//       //   if(data.success) {
//       //     return
//       //   }

//       return { data: data, error: null };
//     } catch (err) {
//       return { data: null, error: { message: "Something Went Wrong" } };
//     }
//   },
// };
