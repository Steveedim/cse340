import {
    getUpcomingProjects,
    getCategoriesByProjectId
} from '../models/project.js';


// Main projects page
const showProjectsPage = async (req, res) => {

    const projects =
        await getUpcomingProjects(5);

    const title = 'Upcoming Service Projects';

    res.render('projects', {
        title,
        projects
    });
};


// Project details page
const showProjectDetailsPage = async (req, res) => {

    const projectId = req.params.id;

    const categories =
        await getCategoriesByProjectId(projectId);

    const title = 'Project Details';

    res.render('project', {
        title,
        categories
    });
};


export {
    showProjectsPage,
    showProjectDetailsPage
};