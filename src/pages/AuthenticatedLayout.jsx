import LoggedNavbar from "../components/Logged_Navbar";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

const Layout = ({ children }) => {
  const { currentUser } = useAuth();
  return (
    <div className="w-full h-auto">
      {currentUser ? <LoggedNavbar /> : <Navbar />}
      <div className="flex-1 h-auto mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
