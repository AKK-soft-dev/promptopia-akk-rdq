"use client";
import Profile from "@components/Profile";
import SyncingIndicator from "@components/SyncingIndicator";
import { useRouter, useSearchParams } from "next/navigation";
import { useDataQuery, useDataQueryMagic } from "react-data-query";

const fetcher = (context) => {
  const userId = context.dataQueryKey[1].toString();
  return fetch(`/api/users/${userId}/posts`).then((res) => res.json());
};

const UserProfile = ({ params }) => {
  const userId = params.id;
  const {
    data: posts = [],
    isFetching,
    isLoading,
  } = useDataQuery(["posts", userId], fetcher, {
    autoFetchEnabled: !!userId,
  });
  const { setQueryData, cancelQuery } = useDataQueryMagic();
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        const dataQueryKey = ["posts", userId];
        const res = await fetch(`/api/prompt/${post?._id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          throw new Error(`${res.status}: Can't delete prompt!`);
        }
        await cancelQuery(dataQueryKey);
        setQueryData(dataQueryKey, (oldPosts) =>
          oldPosts.filter((p) => p._id !== post._id)
        );
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="relative w-full">
      {isFetching && !isLoading && <SyncingIndicator />}
      <Profile
        name={name}
        isLoadingPosts={isLoading}
        desc={`Welcome to ${name}'s personalized profile page`}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default UserProfile;
