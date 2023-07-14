"use client";
import LoadingIndicator from "@components/LoadingIndicator";
import Profile from "@components/Profile";
import SyncingIndicator from "@components/SyncingIndicator";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDataQuery } from "react-data-query";

const fetcher = (context) => {
  const userId = context.dataQueryKey[1].toString();
  return fetch(`/api/users/${userId}/posts`).then((res) => res.json());
};

const MyProfile = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  // const [posts, setPosts] = useState([]);
  const {
    data: posts = [],
    isFetching,
    isLoading,
  } = useDataQuery(["posts", userId], fetcher, {
    autoFetchEnabled: !!userId,
  });
  const router = useRouter();
  console.log({ isFetching });

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="relative w-full">
      {isFetching && !isLoading && <SyncingIndicator />}
      <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyProfile;
