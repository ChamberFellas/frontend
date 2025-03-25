import { IoChevronDown } from "react-icons/io5";
import "./notifications.scss";

const Notifications = () => {
  return (
    <div className="notifications-container">
      <p>Notifications</p>
      <button>
        <IoChevronDown />
      </button>
    </div>
  );
};

export default Notifications;
