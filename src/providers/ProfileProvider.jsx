import { useReducer } from "react";
import { ProfileContext } from "../context";
import { ProfileReducers, initialState } from "../reducers/ProfileReducers";

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProfileReducers, initialState);
  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
