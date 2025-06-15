import Link from "next/link";
interface IappProps {
    data: {
        id: string;
        title: string;
        content: string;
        imageUrl: string;
        authorId: string;
        authorName: string;
        authorImageUrl: string;
        createdAt: Date;
        updatedAt: Date;
    }
}



export function BlogPostCard({ data }: IappProps) {
    console.log(data.authorImageUrl);
    return (
        <div className="group relative overflow-hidden rounded-lg border 
        border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
            <Link href={`/post/${data.id}`} className="block w-full h-full">
                <div className="relative h-48 w-full">
                <img 
                        src={data.imageUrl} 
                        alt="image"
                        className="object-contain w-full h-full"
                    />
                </div>

                <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        {data.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600 line-clamp-2">{data.content}</p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="relative size-8 overflow-hidden rounded-full">
                                <img
                                    src={data.authorImageUrl}
                                    alt="author"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            



                            <p className="text-sm font-medium text-gray-700">{data.authorName}</p>
                        </div>
                        <time className="text-xs text-gray-500">
                            {new Date(data.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </time>
                    </div>
                </div>
            </Link>
        </div>
    )
}