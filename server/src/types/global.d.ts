declare namespace NodeJS {
  interface ProcessEnv {
    JWT_ACCESS_KEY: string;
    JWT_REFRESH_KEY: string;
  }
}

// User without sensetive information
type SafeUser = Omit<
  Prisma.UserGetPayload<{}>,
  'password' | 'createdAt' | 'updatedAt'
>;
