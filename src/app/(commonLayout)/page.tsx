import { BlogCard } from "@/components/modules/homepage/blogcard";
import { blogService } from "@/src/services/blog.service";
import { BlogPost } from "@/src/types";

export default async function Home() {
  const { data } = await blogService.getBlogPost(
    {
      // isFeatured: true,
      // search: "boi",
    },
    {
      cache: "no-store",
    },
  );

  return (
    <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 gap-5 my-3">
      {data?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post}></BlogCard>
      ))}
    </div>
  );
}
