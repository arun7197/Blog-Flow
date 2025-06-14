"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { updatePost } from "@/app/action";
import { useRouter } from "next/navigation";

interface EditButtonProps {
  postId: string;
  initialTitle: string;
  initialContent: string;
  initialImageUrl: string;
}

export default function EditButton({ postId, initialTitle, initialContent, initialImageUrl }: EditButtonProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      const result = await updatePost(postId, formData);
      if (result.success) {
        setIsEditing(false);
        router.refresh();
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (!isEditing) {
    return (
      <Button variant="outline" onClick={() => setIsEditing(true)}>
        Edit Post
      </Button>
    );
  }

  return (
    <Card className="p-4">
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <Input
            id="title"
            name="title"
            defaultValue={initialTitle}
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Content
          </label>
          <Textarea
            id="content"
            name="content"
            defaultValue={initialContent}
            required
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium mb-1">
            Image URL
          </label>
          <Input
            id="url"
            name="url"
            defaultValue={initialImageUrl}
            required
          />
        </div>
        <div className="flex space-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Post"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}