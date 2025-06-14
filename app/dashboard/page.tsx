import { buttonVariants } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { prisma } from "../utils/db";
import { BlogPostCard } from "@/components/general/BlogPostCard";

//using paramas to get id from getUser
async function getData(userId : string){

    await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await prisma.posts.findMany({
        where:{
            authorId: userId
        },
        orderBy:{
            createdAt: 'desc',
        },
    })
    return data;
}

export default async function DashboardRoute(){
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    //sending aruguments to getData function
    const data = await getData(user.id)
    
    return(
        <div>
            <div className="flex items-center justify-between py-7">
                <h2 className="text-2xl font-medium tracking-tight">Your Collections</h2>
                <Link className={buttonVariants()} href="/dashboard/create">
                Create Post
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((item)=> (
                    <BlogPostCard data={item} key={item.id}/>
                ))}
            </div>
        </div>
    )
}