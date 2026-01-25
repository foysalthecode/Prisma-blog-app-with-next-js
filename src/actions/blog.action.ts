"use server";

import { updateTag } from "next/cache";
import { blogService } from "../services/blog.service";
import { BlogData, BlogPost } from "../types";

export const getBlog = async () => {
  return await blogService.getBlogPost();
};

export const createBlogPost = async (data: BlogData) => {
  const res = await blogService.createBlogPost(data);
  updateTag("blogPosts");
  return res;
};
