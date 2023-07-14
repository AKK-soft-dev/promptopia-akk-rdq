"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EditBioForm = ({ bio: initialBio }) => {
  const [bio, setBio] = useState(initialBio);
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleChange = (e) => {
    setBio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(`/api/users/${session?.user.id}`, {
        method: "PATCH",
        body: JSON.stringify({ bio }),
      });

      router.refresh();
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={bio}
        onChange={handleChange}
        className="form_input"
        placeholder="Enter your bio"
      />
      <button
        disabled={submitting}
        className="text-sm px-5 py-1.5 bg-primary-orange rounded-full text-white"
      >
        Edit
      </button>
    </form>
  );
};

export default EditBioForm;
