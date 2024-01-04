import connection from '../database/db'

const allItems = async () => {
  const [query] = await connection.execute('SELECT * FROM cars')
  return query
}

const getItemById = async (id: number) => {
  const [query] = await connection.execute('SELECT * FROM cars WHERE ID=?', [
    id,
  ])
  return query
}

const createItem = async (marca: string, modelo: string, ano: number) => {
  const [query] = await connection.execute(
    'INSERT INTO cars (marca, modelo, ano ) VALUES (?,?,?)',
    [marca, modelo, ano],
  )
  return query
}

const updateItem = async (
  id: number,
  marca: string,
  modelo: string,
  ano: number,
) => {
  const [query] = await connection.execute(
    'UPDATE cars SET marca=?, modelo=?, ano=? WHERE id=?',
    [marca, modelo, ano, id],
  )
  return query
}

const deleteItem = async (id: number) => {
  const [query] = await connection.execute('DELETE FROM cars WHERE id=?', [id])
  return query
}

export default {
  allItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
}
