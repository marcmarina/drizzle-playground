import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

type TableA = {
  id: number;
  text: string;
};

type TableB = {
  id: number;
  tableAId: number;
  comment: string;
};

type Schema = {
  table_a: TableA;
  table_b: TableB;
};

export const database = new Kysely<Schema>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: "localhost",
      database: "playground",
      user: "user",
      password: "password",
      port: 5432,
    }),
  }),
  plugins: [new CamelCasePlugin()],
});
