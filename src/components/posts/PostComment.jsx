/* eslint-disable react/prop-types */
import { useAvatar } from "../../hooks/useAvatar";
import PostCommentList from "./PostCommentList";
import { useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";

const PostComment = ({ post }) => {
  const { state } = useProfile();
  const { auth } = useAuth();
  const [showAlComents, setShowAlComents] = useState(false);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const { api } = useAxios();

  // addComment
  console.log(
    `${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.author?.avatar}`
  );

  const addComment = async (event) => {
    const keyCode = event.keyCode;

    if (keyCode === 13) {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,
          { comment }
        );

        if (response.status === 200) {
          setComments([...response.data.comments]);
          setComment("");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      <div>
        {/* comment input box */}
        <div className="flex-center mb-3 gap-2 lg:gap-4">
          <img
            className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
              auth?.user?.avatar
            }`}
            alt="avatar"
          />
          <div className="flex-1">
            <input
              type="text"
              className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
              name="post"
              id="post"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => addComment(e)}
              placeholder="What's on your mind?"
            />
          </div>
        </div>
        {/* comment filter button */}
        <div className="mt-4">
          <button
            className="text-gray-300 max-md:text-sm"
            onClick={() => setShowAlComents(!showAlComents)}
          >
            All Comment ▾
          </button>
        </div>
        {/* comments */}
        {showAlComents && <PostCommentList comments={comments} />}

        {/* comments ends */}
      </div>
    </>
  );
};
export default PostComment;
