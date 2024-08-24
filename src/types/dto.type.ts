type DTO = Record<
  string,
  {
    required: boolean;
    validate?: (value: unknown) => {
      valid: boolean;
      msg?: string;
    };
  }
>;

export default DTO;
