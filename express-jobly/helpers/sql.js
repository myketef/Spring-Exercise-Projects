const { BadRequestError } = require("../expressError")

/**
 * Helper for making selective update queries.
 *
 * The calling function can use it to make the SET clause of an SQL UPDATE
 * statement.
 *
 * @param {Object} dataToUpdate - An object with fields to update and their
 *   new values.
 * @param {Object} jsToSql - A mapping of JavaScript field names to SQL column
 *   names.
 *
 * @returns {Object} An object with two properties:
 *   {String} setCols: The formatted SET clause for the SQL UPDATE statement.
 *   {Array} values: An array of values for parameterized queries.
 *
 * @example {name: 'John', age: 30} =>
 *   { setCols: '"name"=$1, "age"=$2',
 *     values: ['John', 30] }
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate)
  if (keys.length === 0) throw new BadRequestError("No data")

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
    `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  )

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  }
}

module.exports = { sqlForPartialUpdate }
