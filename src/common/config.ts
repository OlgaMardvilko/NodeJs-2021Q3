import * as dotenv from 'dotenv';

const result: dotenv.DotenvConfigOutput = dotenv.config();

if (result.error) {
  throw result.error;
}

// const { parsed: envs } = result;
// module.exports = envs;
console.log(result.parsed);

const { NODE_ENV, PORT, DB_CONNECTION, JWT_SECRET } = process.env;

export class Config {
  public static NODE_ENV: string = NODE_ENV as string;
  public static PORT: number = Number(PORT);
  public static DB_CONNECTION: string = DB_CONNECTION as string;
  public static JWT_SECRET: string = JWT_SECRET as string;
}
