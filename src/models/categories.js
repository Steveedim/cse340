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

// Get one category by ID
const getCategoryById = async (categoryId) => {

    const query = `
        SELECT
            category_id,
            name
        FROM category
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];

    const result = await db.query(query, queryParams);

    return result.rows[0];
};


// Get all projects for a category
const getProjectsByCategoryId = async (categoryId) => {

    const query = `
        SELECT
            sp.project_id,
            sp.title
        FROM service_project sp
        JOIN project_category pc
            ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1;
    `;

    const queryParams = [categoryId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

export { getAllCategories, getCategoryById, getProjectsByCategoryId };