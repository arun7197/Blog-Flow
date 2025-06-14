import { prisma } from "@/app/utils/db";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deletePost } from "../../action";
import DeleteButton from "@/components/general/DeleteButton";
import EditButton from "@/components/general/EditButton";




async function getData(id: string){
    const data = await prisma.posts.findUnique({
        where:{
            id: id,
        }
    });
    if(!data){
        return notFound();
    }
    return data;
}
type Params = Promise<{id : string}>;

export default async function IdPage({params}: {params: Params}){
    const {id} =await params;
    const data = await getData(id);

    return(
        <div className="max-w-3xl mx-auto py-8 px-4">
            
            <Link href="/" className={buttonVariants({variant:"secondary"})}>
            Back to Posts
            </Link>
            <div className="mb-8 mt-6">
                <div className="flex justify-between">
                <h1 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h1>
                <div className="flex space-x-2">
                        <EditButton
                            postId={data.id}
                            initialTitle={data.title}
                            initialContent={data.content}
                            initialImageUrl={data.imageUrl}
                        />
                        <DeleteButton postId={data.id} />
                    </div>
               
                </div>
                
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="relative size-10 overflow-hidden rounded-full">
                            <Image src={data.authorImageUrl} alt={data.authorImageUrl} fill 
                            className="object-cover"/>
                        </div>
                        <p className="font-medium">{data.authorName}</p>
                    </div>
                    <p className="text-sm  text-gray-600">{new Date(data.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="relative h-[400px] w-full mb-8 overflow-hidden rounded-lg">
                <Image 
                    src={data.imageUrl} 
                    alt={data.imageUrl} 
                    fill 
                    className="object-contain" 
                    priority
                />
            </div>
            <Card>
                <CardContent>
                    {data.content}
                </CardContent>

            </Card>
        </div>
    )
}

