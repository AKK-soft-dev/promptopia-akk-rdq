import LoadingIndicator from "./LoadingIndicator";
import PromptCard from "./PromptCard";

const Profile = ({
  name,
  desc,
  isLoadingPosts,
  data,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="prompt_layout mt-10">
        {data && data.length > 0 ? (
          data?.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        ) : isLoadingPosts ? (
          <LoadingIndicator />
        ) : (
          <p>No posts here!</p>
        )}
      </div>
    </section>
  );
};

export default Profile;
