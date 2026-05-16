import db from './db.js'
const getAllCategories = async() => {
    const query = `
    SELECT *
    FROM public.category
    ORDER BY name;
  `;
    const result = await db.query(query);
    return result.rows;
};

export { getAllCategories };