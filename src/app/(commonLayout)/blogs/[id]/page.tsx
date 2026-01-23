export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  return (
    <div>
      <h1>This is a dynamic page</h1>
    </div>
  );
}

// import { useParams } from "next/navigation"; //! this can be use only in client components
//   const { id } = useParams();  //! this can be use only in client components
