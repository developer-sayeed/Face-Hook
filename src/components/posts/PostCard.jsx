/* eslint-disable react/prop-types */
import PostActions from "./PostActions";
import PostBody from "./PostBody";
import PostComment from "./PostComment";
import PostHeader from "./PostHeader";

const PostCard = ({ post }) => {
  return (
    <>
      <article className="card mt-6 lg:mt-8">
        <PostHeader post={post} />
        {/* post body */}
        <PostBody poster={post?.image} content={post.content} />
        {/* post body ends */}
        {/* post actions */}
        <PostActions post={post} comments={post?.comments?.length} />
        {/* post actions  */}
        {/* comment section */}
        <PostComment post={post} />
        {/* comment section ends */}
      </article>
    </>
  );
};
export default PostCard;
