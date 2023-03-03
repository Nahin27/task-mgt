import { sql } from "../database/database.js";

const create = async (name) => {
    await sql`insert into tasks (name) values (${name})`;
};

const listTBD = async () => {
    return await sql`select * from tasks where completed = false`;
};

export { create, listTBD };