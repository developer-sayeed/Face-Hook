import { useEffect } from "react";
import { useAxios } from "../hooks/useAxios";
import PostList from "../components/posts/PostList";
import { actions } from "../actions";

import { usePost } from "../hooks/usePost";
import NewPost from "../components/posts/NewPost";
const HomePage = () => {
  const { state, dispatch } = usePost();
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });

    // Fetching Post

    const fetchingPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );
        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
      }
    };
    fetchingPost();
  }, []);

  if (state?.loading) {
    return <div>Data Loading....</div>;
  }
  if (state?.error) {
    return <div>Data Fetching Error {state?.error?.message}</div>;
  }
  return (
    <>
      <NewPost />
      <PostList posts={state?.posts} />
    </>
  );
};

export default HomePage;
