import { BlogPostCard } from "@/components/general/BlogPostCard";
import { prisma } from "./utils/db";

async function getData(){
  const data = await prisma.posts.findMany({
    select:{
      title: true,
      content: true,
      imageUrl: true,
      authorImageUrl: true,
      authorName: true,
      id: true,
      createdAt: true,
      authorId: true,
      updatedAt: true,
    },
    orderBy:{
      createdAt:"desc",
    }
  })
  

  
  return data;
}
export default async function Home() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold tracking-tight mb-8">Latest posts</h1>

      <BlogPosts />
    </div>
    
  );
}
async function BlogPosts() {
  const data = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <BlogPostCard data={item} key={item.id} />
      ))}
    </div>
  );
}