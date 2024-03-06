/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { PostContext } from "../context";
import { initialState, postReducer } from "../reducers/postReducers";
const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
