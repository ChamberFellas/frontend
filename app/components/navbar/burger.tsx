import { Link } from "react-router";
import { useState } from "react";

export const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="burger" onClick={() => setIsOpen((isOpen) => !isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {isOpen && <BurgerMenu />}
    </>
  );
};

export const BurgerMenu = () => {
  return (
    <div className="burger-menu">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/chores">Chores</Link>
        </li>
        <li>
          <Link to="/bills">Bills</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};
