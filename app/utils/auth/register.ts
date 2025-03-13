interface RegisterProps {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const handleRegister = async ({
  name,
  email,
  password,
  repeatPassword,
}: RegisterProps) => {
  if (!name || !email || !password || !repeatPassword) {
    throw new Error("All fields are required");
  }

  if (password !== repeatPassword) {
    throw new Error("Passwords do not match");
  }

  // Fake fetch Token form api
  const token = "temp_token";

  return token;
};

export default handleRegister;
