"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { useDataQuery } from "react-data-query";

const fetcher = (context) => {
  const promptId = context.dataQueryKey[1].toString();
  return fetch(`/api/prompt/${promptId}`).then((res) => res.json());
};
const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  useDataQuery(["prompt", promptId], fetcher, {
    autoFetchEnabled: !!promptId,
    cacheTime: 0,
    onSuccess(data) {
      setPost({ prompt: data?.prompt, tag: data?.tag });
    },
  });

  const updatePrompt = async (e) => {
    e.preventDefault();
    // If promptId is missing, don't do anything
    if (!promptId) return;
    setSubmitting(true);

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log({ err });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      disabled={!post?.prompt || !post?.tag}
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
