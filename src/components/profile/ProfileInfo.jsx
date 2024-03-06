import { useAuth } from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
import ProfileImage from "./ProfileImage";
import UserBio from "./UserBio";

const ProfileInfo = () => {
  const { state } = useProfile();

  const { auth } = useAuth();

  const user = state?.user ?? auth?.user;
  return (
    <>
      {" "}
      {/* profile info */}
      <div className="flex flex-col items-center py-8 text-center">
        {/* profile image */}
        <ProfileImage />
        {/* name , email */}
        <div>
          <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
            {user?.firstName + " " + user?.lastName}
          </h3>
          <p className="leading-[231%] lg:text-lg">{user?.email}</p>
        </div>
        {/* bio */}
        <UserBio />
        <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8" />
      </div>
      {/* end profile info */}
    </>
  );
};
export default ProfileInfo;
