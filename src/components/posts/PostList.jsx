/* eslint-disable react/prop-types */
import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  console.log(posts);
  return (
    <>
      {!!posts &&
        posts?.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
    </>
  );
};
export default PostList;
