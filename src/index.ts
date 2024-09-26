import { database } from "./database";

async function main() {
  const res = await database
    .selectFrom("table_a")
    .innerJoin("table_b", "table_a.id", "table_b.tableAId")
    .where("table_a.id", "=", "1")
    .selectAll()
    .execute();
}

main();
