import LoggedNavbar from "../components/Logged_Navbar";

const AuthenticatedLayout = ({ children }) => {
  return (
    <div>
      <LoggedNavbar />
      <div>{children}</div>
    </div>
  );
};

export default AuthenticatedLayout;
