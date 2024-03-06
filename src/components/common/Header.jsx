import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import home from "../../assets/icons/home.svg";
import notification from "../../assets/icons/notification.svg";
import avatars from "../../assets/images/avatars/avatar_1.png";
import Logout from "../Auth/Logout";
import { useAuth } from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";

const Header = () => {
  const { auth } = useAuth();
  const { state } = useProfile();

  const user = state?.user ?? auth?.user;
  return (
    <>
      <>
        {/* Navbar */}
        <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
          <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
            {/* Logo */}
            <Link to="/">
              <img
                className="max-w-[100px] rounded-full lg:max-w-[130px]"
                src={logo}
              />
            </Link>
            {/* nav links  */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="btn-primary">
                <img src={home} alt="Home" />
                Home
              </Link>
              <button className="icon-btn">
                <img src={notification} alt="Notification" />
              </button>
              <Logout />
              <Link to={"/me"} className="flex-center !ml-8 gap-3">
                <span className="text-lg font-medium lg:text-xl">
                  {user?.firstName} {user?.lastName}
                </span>
                <img
                  className="max-h-[42px] max-w-[42px] lg:max-h-[50px] lg:max-w-[50px] rounded-full"
                  src={
                    user.avatar
                      ? `${import.meta.env.VITE_SERVER_BASE_URL}/${user.avatar}`
                      : "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png"
                  }
                  alt=""
                />
              </Link>
            </div>
            {/* nav links ends */}
          </div>
        </nav>
      </>
    </>
  );
};
export default Header;
