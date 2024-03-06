import { useNavigate } from "react-router-dom";
import logout from "../../assets/icons/logout.svg";
import { useAuth } from "../../hooks/useAuth";
const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  //   handleLogOut
  const handleLogOut = () => {
    setAuth({});
    navigate("/login");
  };
  return (
    <button className="icon-btn" onClick={handleLogOut}>
      <img src={logout} alt="Logout" />
    </button>
  );
};
export default Logout;
