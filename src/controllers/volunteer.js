import {
    addVolunteer,
    removeVolunteer
} from '../models/volunteer.js';

/* VOLUNTEER */
const addVolunteerController = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.projectId;

    await addVolunteer(userId, projectId);

    res.redirect(`/project/${projectId}`);
};

/* UNVOLUNTEER */
const removeVolunteerController = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.projectId;

    await removeVolunteer(userId, projectId);

    res.redirect(`/project/${projectId}`);
};

export {
    addVolunteerController,
    removeVolunteerController
};