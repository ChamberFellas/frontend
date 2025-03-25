import "./../styles/welcome-style.scss"; // Correct the SCSS file path
import welcomeImage from "./../assets/welcomeImage.jpg"; // Import the image

const Welcome = () => {
  return (
    <main className="welcome-main">
      <div className="welcome-content">
        <h1 className="welcome-heading">ChamberFellas</h1>
        <p className="welcome-body">Shared housing made easy!</p>
      </div>
      {/* <img src={welcomeImage} alt="Welcome" className="welcome-image" />  */}
      <div className="chores-main">
        <h2 className="chores-heading">Chores</h2>
        <div className="chores-body">
          <p>
            Manage your household chores efficiently. Add any chores such as:
          </p>
          <ul>
            <li>One-Off Chores</li>
            <li>Weekly Chores</li>
            <li>Monthly Chores</li>
            <li>Custom Time-Frames</li>
          </ul>
        </div>
      </div>

      <div className="bills-main">
        <h2 className="bills-heading">Bills</h2>
        <div className="bills-body">
          <p>
            Keep track of your household bills and expenses. Add information
            such
          </p>
          as:
          <ul>
            <li>Rent payments</li>
            <li>Utility bills</li>
            <li>Grocery expenses</li>
            <li>Shared subscriptions</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
