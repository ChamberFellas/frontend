interface PasswordCheck {
  isValid: boolean;
  error: string;
}

export const passwordCheck = (password: string): PasswordCheck => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return {
    isValid: regex.test(password),
    error: regex.test(password)
      ? ""
      : "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&). It must be at least 8 characters long.",
  };
};
