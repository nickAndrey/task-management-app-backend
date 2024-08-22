interface User {
  id?: string;
  first_name: string;
  last_name: string;
  email_address: string;
  password: string;
  phone_number: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export default User;
