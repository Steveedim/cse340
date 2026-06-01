import db from './db.js';

// Get all projects
const getAllProjects = async () => {

    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            project_date
        FROM service_project
        ORDER BY project_date;
    `;

    const result = await db.query(query);

    return result.rows;
};

// Get projects by organization ID
const getProjectsByOrganizationId = async (organizationId) => {

    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY project_date;
    `;

    const queryParams = [organizationId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {

    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.project_date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM service_project sp
        JOIN organization o
            ON sp.organization_id = o.organization_id
        WHERE sp.project_date >= CURRENT_DATE
        ORDER BY sp.project_date ASC
        LIMIT $1;
    `;

    const queryParams = [number_of_projects];

    const result = await db.query(query, queryParams);

    return result.rows;
};

// Get categories for a project
const getCategoriesByProjectId = async (projectId) => {

    const query = `
        SELECT
            c.category_id,
            c.name
        FROM category c
        JOIN project_category pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;

    const queryParams = [projectId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

const createProject = async (title, description, location, project_date, organizationId) => {
    const query = `
      INSERT INTO service_project (title, description, location, project_date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, project_date, organizationId];
    const result = await db.query(query, queryParams);
    console.log('QUERY PARAMS:', queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};

const getProjectDetails = async (projectId) => {

    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            project_date
        FROM service_project
        WHERE project_id = $1;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows[0];
};

const updateProject = async (
    projectId,
    title,
    description,
    location,
    project_date,
    organizationId
) => {

    const query = `
        UPDATE service_project
        SET
            title = $1,
            description = $2,
            location = $3,
            project_date = $4,
            organization_id = $5
        WHERE project_id = $6
        RETURNING project_id;
    `;

    const queryParams = [
        title,
        description,
        location,
        project_date,
        organizationId,
        projectId
    ];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to update project');
    }

    return result.rows[0].project_id;
};

// Export model functions
export {getAllProjects, 
    getProjectsByOrganizationId,
    getUpcomingProjects, 
    getCategoriesByProjectId,
    createProject,
    getProjectDetails,
    updateProject
};