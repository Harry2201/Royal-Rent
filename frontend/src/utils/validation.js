const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

export function validateEmail(email) {
  if (!email?.trim()) return 'Email is required';
  if (!emailRegex.test(email.trim())) return 'Enter a valid email address';
  return '';
}

export function validatePassword(password, minLength = 8) {
  if (!password) return 'Password is required';
  if (password.length < minLength)
    return `Password must be at least ${minLength} characters`;
  return '';
}

export function validateLogin({ email, password }) {
  const errors = {};
  const emailErr = validateEmail(email);
  const passwordErr = validatePassword(password);
  if (emailErr) errors.email = emailErr;
  if (passwordErr) errors.password = passwordErr;
  return errors;
}

export function validateSignup({
  name,
  email,
  phone,
  password,
  confirmPassword,
  userType,
  termsAccepted,
}) {
  const errors = {};

  if (!name?.trim()) errors.name = 'Full name is required';
  else if (name.trim().length < 2) errors.name = 'Name must be at least 2 characters';

  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;

  if (!phone?.trim()) errors.phone = 'Phone number is required';
  else if (!phoneRegex.test(phone.replace(/\s/g, '')))
    errors.phone = 'Enter a valid 10-digit Indian mobile number';

  const passwordErr = validatePassword(password);
  if (passwordErr) errors.password = passwordErr;

  if (!confirmPassword) errors.confirmPassword = 'Please confirm your password';
  else if (confirmPassword !== password) errors.confirmPassword = 'Passwords do not match';

  if (!userType) errors.userType = 'Select how you want to use Royale Rent';

  if (!termsAccepted) errors.terms = 'You must accept the terms & conditions';

  return errors;
}
