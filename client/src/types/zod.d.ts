export type CustomZodError = {
  path: String;
  message: String;
};

export type CustomZodErrors = {
  errors: CustomZodError[];
};
