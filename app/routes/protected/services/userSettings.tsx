import Navbar from "~/components/navbar";
import "../../../styles/userSettings.scss";


const UserSettings = () => {
  const saveName = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Save Name function called");
    // Add logic to save the name
  };

  const savePassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Save Password function called");
    // Add logic to save the password
  };

  const saveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Save Email function called");
    // Add logic to save the email
  };

  return (
    <div>
      <Navbar leftIcon="BACK" rightIcon="DASHBOARD" title="User Settings" />
      <h1>User Settings</h1>
      <p>Here you can update your account information.</p>

      {/* Form to change name */}
      <form onSubmit={saveName}>
        <label htmlFor="name">Change Name:</label>
        <input type="text" id="name" name="name" placeholder="Enter new name" required />
        <button type="submit">Save Name</button>
      </form>

      {/* Form to change password */}
      <form onSubmit={savePassword}>
        <label htmlFor="password">Change Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter new password"
          required
        />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm new password"
          required
        />
        <button type="submit">Save Password</button>
      </form>

      {/* Form to change email */}
      <form onSubmit={saveEmail}>
        <label htmlFor="email">Change Email:</label>
        <input type="email" id="email" name="email" placeholder="Enter new email" required />
        <button type="submit">Save Email</button>
      </form>
    </div>
  );
};

export default UserSettings;