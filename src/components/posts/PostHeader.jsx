/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useProfile from "../../hooks/useProfile";
import TimeIcon from "../../assets/icons/time.svg";
import ThreeDotIcon from "../../assets/icons/3dots.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import { calculateTimeDifference } from "../../utils";
import { useAvatar } from "../../hooks/useAvatar";
import { useState } from "react";

const PostHeader = ({ post }) => {
  const { state, dispatch } = useProfile();
  const { avatarURL } = useAvatar(post);

  const [showActon, setShowActon] = useState(false);

  // toggoleAction

  const toggoleAction = () => {
    setShowActon(!showActon);
  };
  return (
    <>
      {/* post header */}
      <header className="flex items-center justify-between gap-4">
        {/* author info */}
        <div className="flex items-center gap-3">
          <img
            className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
            src={avatarURL}
            alt={state?.user?.firstName}
          />
          <div>
            <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
            <div className="flex items-center gap-1.5">
              <img src={TimeIcon} alt="time" />
              <span className="text-sm text-gray-400 lg:text-base">
                {`${calculateTimeDifference(post?.createAt)}`}
              </span>
            </div>
          </div>
        </div>
        {/* author info ends */}
        {/* action dot */}
        <div className="relative">
          <button onClick={toggoleAction}>
            <img src={ThreeDotIcon} alt="3dots of Action" />
          </button>
          {/* Action Menus Popup */}
          {showActon && (
            <div className="action-modal-container">
              <button className="action-menu-item hover:text-lwsGreen">
                <img src={EditIcon} alt="Edit" />
                Edit
              </button>
              <button className="action-menu-item hover:text-red-500">
                <img src={DeleteIcon} alt="Delete" />
                Delete
              </button>
            </div>
          )}
        </div>
        {/* action dot ends */}
      </header>
      {/* post header ends */}
    </>
  );
};
export default PostHeader;
