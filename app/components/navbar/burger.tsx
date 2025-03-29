import { Link } from "react-router";
import { useState, useEffect, useRef } from "react";

export const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null); // Allow null for initial value

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div
        className="burger"
        onClick={toggleMenu}
        style={{ top: 0 }} // Ensure the burger aligns with the top of the application
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      {isOpen && <BurgerMenu toggleMenu={toggleMenu} menuRef={menuRef} />}
    </>
  );
};

export const BurgerMenu = ({
  toggleMenu,
  menuRef,
}: {
  toggleMenu: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>; // Allow null for compatibility with useRef
}) => {
  return (
    <div className="burger-menu" ref={menuRef}>
      <ul>
        <li>
          <Link to="/dashboard" onClick={toggleMenu}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/chores" onClick={toggleMenu}>
            Chores
          </Link>
        </li>
        <li>
          <Link to="/bills" onClick={toggleMenu}>
            Bills
          </Link>
        </li>
        <li>
          <Link to="/account" onClick={toggleMenu}>
            Account
          </Link>
        </li>
        <li>
          <Link to="/house" onClick={toggleMenu}>
            House
          </Link>
        </li>
        <li>
          <Link to="/settings" onClick={toggleMenu}>
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};