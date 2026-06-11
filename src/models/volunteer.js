import db from './db.js';

/* ADD volunteer */
export async function addVolunteer(userId, projectId) {
    const sql = `
        INSERT INTO volunteer (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        RETURNING *
    `;
    return await db.query(sql, [userId, projectId]);
}

/* REMOVE volunteer */
export async function removeVolunteer(userId, projectId) {
    const sql = `
        DELETE FROM volunteer
        WHERE user_id = $1 AND project_id = $2
    `;
    return await db.query(sql, [userId, projectId]);
}

/* CHECK volunteer */
export async function checkVolunteer(userId, projectId) {
    const sql = `
        SELECT * FROM volunteer
        WHERE user_id = $1 AND project_id = $2
    `;
    const result = await db.query(sql, [userId, projectId]);
    return result.rowCount > 0;
}

/* GET user's projects (dashboard) */
export async function getVolunteerProjects(userId) {
    const sql = `
        SELECT sp.*
        FROM volunteer v
        JOIN service_project sp ON v.project_id = sp.project_id
        WHERE v.user_id = $1
        ORDER BY sp.project_date
    `;
    const result = await db.query(sql, [userId]);
    return result.rows;
}