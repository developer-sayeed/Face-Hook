import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";
import useProfile from "../hooks/useProfile";

import ProfileInfo from "../components/profile/ProfileInfo";
import MyPost from "../components/profile/MyPost";
import { actions } from "../actions";

const ProfilePage = () => {
  const { state, dispatch } = useProfile();
  const { auth } = useAuth();
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const featchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );

        if (response.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };
    featchProfile();
  }, []);

  // if (state?.loading) {
  //   return <div>Featching Your Profile Data.....</div>;
  // }
  return (
    <>
      <main className="mx-auto max-w-[1020px] py-8">
        <div className="container">
          <ProfileInfo />

          <MyPost />
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
