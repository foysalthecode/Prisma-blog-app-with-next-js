import HistoryTable from "@/components/modules/user/history/HistoryTable";
import PaginationControls from "@/components/ui/pagination-controls";
import { blogService } from "@/src/services/blog.service";

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const res = await blogService.getBlogPost({ page });
  const posts = res.data?.data || [];

  const pagination = res.data?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">BLog post History</h1>
      <HistoryTable posts={posts}></HistoryTable>
      <PaginationControls meta={pagination} />
    </div>
  );
}
