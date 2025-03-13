interface LoginProps {
  email: string;
  password: string;
}

const handleLogin = async ({ email, password }: LoginProps) => {
  if (!email || !password) {
    throw new Error("Username and password are required");
  }

  // Fake fetch Token form api
  const token = "temp_token";

  return token;
};

export default handleLogin;
