import CreateBlogFormServer from "@/components/modules/user/createBlog/CreateBlogFormServer";
import { blogService } from "@/src/services/blog.service";
import { BlogPost } from "@/src/types";

export default async function CreateBlogPage() {
  const { data } = await blogService.getBlogPost();
  return (
    <div>
      <CreateBlogFormServer></CreateBlogFormServer>
      {data.data.map((item: BlogPost) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}
