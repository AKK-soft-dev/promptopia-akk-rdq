import Link from "next/link";

const Form = ({ type, post, setPost, disabled, submitting, handleSubmit }) => {
  return (
    <section className="w-full flex-col flex-start max-w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-10 max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-bold-700">
            Your AI Prompt
          </span>

          <textarea
            disabled={disabled}
            value={post.prompt}
            onChange={(e) =>
              setPost((prev) => ({ ...prev, prompt: e.target.value }))
            }
            placeholder={disabled ? "Loading..." : "Write your prompt here..."}
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-bold-700">
            Tag {` `}{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>

          <input
            disabled={disabled}
            value={post.tag}
            onChange={(e) =>
              setPost((prev) => ({ ...prev, tag: e.target.value }))
            }
            placeholder={disabled ? "Loading..." : "#tag"}
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/profile" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting || disabled}
            className="text-sm px-5 py-1.5 bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
