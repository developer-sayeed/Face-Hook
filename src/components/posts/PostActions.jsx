/* eslint-disable react/prop-types */
import LikeIcon from "../../assets/icons/like.svg";
import LikedIcon from "../../assets/icons/like-filled.svg";
import CommentIcon from "../../assets/icons/comment.svg";
import ShareIcon from "../../assets/icons/share.svg";
import { useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

const PostActions = ({ post, comments }) => {
  const { auth } = useAuth();
  const [liked, setLiked] = useState(post?.likes?.includes(auth?.user?.id));
  const { api } = useAxios();

  // handleLike

  const handleLike = async () => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/like`
      );

      if (response.status === 200) {
        setLiked(true);
      }
    } catch (error) {
      console.error(error);
      setLiked(false);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
        {/* Like Button */}
        <button
          className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
          onClick={handleLike}
        >
          <img src={!liked ? LikeIcon : LikedIcon} alt="Like" />
          <span>{liked ? "Liked" : "Like"}</span>
        </button>
        {/* Comment Button */}
        <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
          <img src={CommentIcon} alt="Comment" />
          <span>Comment({comments ?? 0})</span>
        </button>
        {/* Share Button */}
        {/* Like Button */}
        <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
          <img src={ShareIcon} alt="Share" />
          <span>Share</span>
        </button>
      </div>
    </>
  );
};
export default PostActions;