import User from '../models/User';

const validateUserUpdateDto = (user: Record<string, unknown>) => {
  const { id, first_name, last_name, phone_number, email_address, password } =
    user as Partial<User>;

  if (!id) {
    return 'User ID is required';
  }

  if (!first_name && !last_name && !phone_number && !email_address && !password) {
    return 'At least one field is required to update';
  }

  if (email_address && !email_address.includes('@')) {
    return 'Invalid email address';
  }

  return null;
};

export default validateUserUpdateDto;
