import { useAuth } from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
import EditIcon from "../../assets/icons/edit.svg";
import { useAxios } from "../../hooks/useAxios";
import { useRef } from "react";
import { actions } from "../../actions";

const ProfileImage = () => {
  const { state, dispatch } = useProfile();

  const { api } = useAxios();

  const fileUploaderRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();

    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();
  };

  const updateImageDisplay = async () => {
    try {
      const formData = new FormData();
      for (const file of fileUploaderRef.current.files) {
        formData.append("avatar", file);
      }

      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
          state?.user?.id
        }/avatar`,
        formData
      );
      if (response.status === 200) {
        dispatch({
          type: actions.profile.IMAGE_UPDATED,
          data: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <>
      <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px] border ">
        <img
          className="max-w-full rounded-full object-cover w-full h-full"
          src={
            state?.user?.avatar
              ? `${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`
              : "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png"
          }
          alt={state?.user?.firstName}
        />
        <form encType="multipart/form-data">
          <button
            type="submit"
            className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
            onClick={handleImageUpload}
          >
            <img src={EditIcon} alt="Edit" />
          </button>
          <input type="file" id="file" hidden ref={fileUploaderRef} />
        </form>
      </div>
    </>
  );
};
export default ProfileImage;
