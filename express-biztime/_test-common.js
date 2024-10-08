/** code common to tests. */

const db = require("./db")


async function createData() {
       await db.query("DELETE FROM invoices")
       await db.query("DELETE FROM companies")
       await db.query("SELECT setval('invoices_id_seq', 1, false)")

       await db.query(`INSERT INTO companies (code, name, description)
                    VALUES ('lenvovo', 'Lenvovo', 'Maker of lenvovo.'),
                           ('len', 'LEN', 'Gray back.')`)

       const inv = await db.query(
              `INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date)
           VALUES ('lenvovo', 100, false, '2024-10-01', null),
                  ('lenvovo', 200, true, '2024-02-01', '2024-02-02'),
                  ('len', 300, false, '2024-03-01', null)
           RETURNING id`)
}


module.exports = { createData }
