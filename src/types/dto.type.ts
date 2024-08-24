type DTO = Record<
  string,
  {
    required: boolean;
    validate?: (value: string) => {
      valid: boolean;
      msg?: string;
    };
  }
>;

export default DTO;
