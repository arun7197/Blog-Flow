"use client";
import { deletePost } from "@/app/action";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";

export default function DeleteButton({ postId }: { postId: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            await deletePost(postId);
            router.push("/"); // Redirect to homepage after deletion
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <Button onClick={handleDelete} className={buttonVariants({variant:"default"}) }>Delete post</Button>
        //<button onClick={handleDelete} className="text-red-500">Delete Post</button>
    );
}