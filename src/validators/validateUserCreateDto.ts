const validateUserCreateDto = (user: Record<string, unknown>): string | null => {
  // Validate first name
  if (typeof user.first_name !== 'string') {
    return 'Invalid first_name';
  }

  // Validate last name
  if (typeof user.last_name !== 'string') {
    return 'Invalid last_name';
  }

  // Validate email address
  if (typeof user.email_address !== 'string' || !/^\S+@\S+\.\S+$/.test(user.email_address)) {
    return 'Invalid email_address';
  }

  // Validate password
  if (typeof user.password !== 'string') {
    return 'Invalid password';
  }

  // Validate phone number
  if (typeof user.phone_number !== 'string' || !/^[0-9]{10,15}$/.test(user.phone_number)) {
    return 'Invalid phone_number';
  }

  // All validations passed
  return null;
};

export default validateUserCreateDto;
