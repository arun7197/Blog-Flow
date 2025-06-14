"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

export async function handleSubmission(formData: FormData){
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const title = formData.get("title")
    const content = formData.get("content")
    const url = formData.get("url")

    const data = await prisma.posts.create({
        data: {
            title: title as string,
            content: content as string,
            imageUrl: url as string,
            authorId: user.id as string,
            authorImageUrl: user?.picture as string,
            authorName: user?.given_name as string,
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
      return { success: false };
    }
  }

  export async function updatePost(id: string,data: FormData){
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
    }catch (error) {
      return {success: false};
    }
    
    

  }