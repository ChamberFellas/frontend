import { Link } from "react-router";
import { VscAccount } from "react-icons/vsc";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Burger } from "./burger";
import LogoutButton from "./logoutButton";
import "./navbar.scss";

type ButtonOption =
  | "BURGER"
  | "HOME"
  | "BACK"
  | "ACCOUNT"
  | "LOGOUT"
  | "DASHBOARD";

interface NavbarProps {
  leftIcon?: ButtonOption;
  rightIcon?: ButtonOption;
  title?: string;
}


const Navbar = ({
  leftIcon = "BURGER",
  rightIcon = "ACCOUNT",
  title,
}: NavbarProps) => {
  return (
    <nav className="navbar">
      <Icon icon={leftIcon} />
      {title && <h1 className="navbar-title">{title}</h1>}
      <div className="navbar-right-icon">
        <Icon icon={rightIcon} />
      </div>
    </nav>
  );
};

export default Navbar;

const Icon = ({ icon }: { icon: ButtonOption }) => {
  switch (icon) {
    case "BURGER":
      return <Burger />;
    case "HOME":
      return (
        <Link to="/dashboard">
          <FaHome />
        </Link>
      );
    case "BACK":
      // Fix
      return (
        <Link to="/dashboard">
          <IoChevronBackOutline />
        </Link>
      );
    case "ACCOUNT":
      return (
        <Link to="/account">
          <VscAccount />
        </Link>
      );
    case "LOGOUT":
      return <LogoutButton />;
    case "DASHBOARD":
      return (
        <Link to="/dashboard">
          <RxCross2 />
        </Link>
      );
  }
};
