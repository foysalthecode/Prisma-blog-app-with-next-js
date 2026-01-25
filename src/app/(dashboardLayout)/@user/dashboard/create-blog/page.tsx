import CreateBlogFormServer from "@/components/modules/user/createBlog/CreateBlogFormServer";
import CreateBlogFormClient from "@/components/modules/user/createBlog/createBlogFromClient";
import { blogService } from "@/src/services/blog.service";
import { BlogPost } from "@/src/types";

export default async function CreateBlogPage() {
  const { data } = await blogService.getBlogPost();
  return (
    <div>
      {/* <CreateBlogFormServer></CreateBlogFormServer> */}
      <CreateBlogFormClient></CreateBlogFormClient>
      {data.data.map((item: BlogPost) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}
