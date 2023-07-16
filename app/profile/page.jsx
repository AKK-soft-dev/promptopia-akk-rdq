"use client";
import Profile from "@components/Profile";
import SyncingIndicator from "@components/SyncingIndicator";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  useDataQuery,
  useDataQueryMagic,
  useDataMutation,
} from "react-data-query";

const fetcher = (context) => {
  const userId = context.dataQueryKey[1].toString();
  return fetch(`/api/users/${userId}/posts`).then((res) => res.json());
};

const MyProfile = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { getQueryData, setQueryData, invalidateQuery, cancelQuery } =
    useDataQueryMagic();
  // const [posts, setPosts] = useState([]);
  const {
    data: posts = [],
    isFetching,
    isLoading,
  } = useDataQuery(["posts", userId], fetcher, {
    autoFetchEnabled: !!userId,
  });
  const { isMutating, mutate: deletePrompt } = useDataMutation(
    (post) => {
      return fetch(`/api/prompt/${post._id.toString()}`, {
        method: "DELETE",
      }).then((res) => {
        if (!res.ok) throw new Error(`${res.status}: Can't delete prompt`);
      });
    },
    {
      async onMutate(post) {
        const dataQueryKey = ["posts", userId];
        const prevPosts = getQueryData(dataQueryKey);
        await cancelQuery(dataQueryKey);
        setQueryData(dataQueryKey, (oldPosts) =>
          oldPosts.filter((p) => p._id !== post._id)
        );

        return { prevPosts };
      },
      onSuccess() {
        alert("Successfully deleted prompt!");
      },
      onError(_err, _post, context) {
        setQueryData(["posts", userId], context.prevPosts);
        alert(_err.message);
      },
      onSettled() {
        (async () => {
          await cancelQuery(["posts", userId]);
          invalidateQuery(["posts", userId]);
        })();
      },
    }
  );
  const router = useRouter();

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      deletePrompt(post);
    }
  };

  return (
    <div className="relative w-full">
      {((isFetching && !isLoading) || isMutating) && <SyncingIndicator />}
      <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        isLoadingPosts={isLoading}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyProfile;
