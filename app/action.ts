"use server";

import { getServerSession } from "next-auth/next";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

export async function handleSubmission(formData: FormData) {
    const session = await getServerSession();
    const user = session?.user;

    if (!user) {
        throw new Error("User not authenticated");
    }

    const title = formData.get("title")
    const content = formData.get("content")
    const url = formData.get("url")
    await prisma.posts.create({
        data: {
            title: title as string,
            content: content as string,
            imageUrl: url as string,
            authorId: (user as any).id as string,
            authorImageUrl: user?.image as string,
            authorName: user?.name as string,
        }
    })

    return redirect("/dashboard")
}

export async function deletePost(id: string) {
  try {
    await prisma.posts.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error('Delete post error:', error);
    return { 
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete post'
    };
  }
}

export async function updatePost(id: string, data: FormData) {
  try {
    const title = data.get("title");
    const content = data.get("content");
    const url = data.get("url");

    await prisma.posts.update({
      where: {id},
      data: {
        title: title as string,
        content: content as string,
        imageUrl: url as string,
      },
    })
    return {success: true};
  } catch (error) {
    console.error('Update post error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update post'
    };
  }
}