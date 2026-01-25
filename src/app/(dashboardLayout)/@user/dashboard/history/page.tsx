import HistoryTable from "@/components/modules/user/history/HistoryTable";
import { blogService } from "@/src/services/blog.service";

export default async function HistoryPage() {
  const res = await blogService.getBlogPost();
  const posts = res.data?.data || [];
  console.log("data from history page", posts);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">BLog post History</h1>
      <HistoryTable posts={posts}></HistoryTable>
    </div>
  );
}
