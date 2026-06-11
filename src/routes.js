import express from 'express';

import { showHomePage } from './controllers/index.js';

import { showOrganizationsPage,
    showOrganizationDetailsPage,
     showNewOrganizationForm,  
     processNewOrganizationForm, 
     organizationValidation, 
     showEditOrganizationForm,
     processEditOrganizationForm
     } from './controllers/organizations.js';

import { 
     showProjectsPage,
     showProjectDetailsPage,
     showNewProjectForm,
     processNewProjectForm,
     projectValidation,
     showEditProjectForm,
     processEditProjectForm
 } from './controllers/projects.js';


import { 
     showCategoriesPage,
     showCategoryDetailsPage,
     showAssignCategoriesForm,
     processAssignCategoriesForm,
     showNewCategoryForm,
     processNewCategoryForm,
     showEditCategoryForm,
     processEditCategoryForm
 } from './controllers/categories.js';

 import { 
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout
 } from "./controllers/users.js";

 import {
    showDashboard,
    requireLogin
} from './controllers/users.js';

import {
    requireRole
} from './controllers/users.js';

import {
    addVolunteerController,
    removeVolunteerController
} from './controllers/volunteer.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

// Home page
router.get('/', showHomePage);

// Organizations pages
router.get('/organizations', showOrganizationsPage);

router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/new-organization',requireRole('admin'), showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization',  requireRole('admin'),organizationValidation, processNewOrganizationForm);
// Route to display the edit organization form
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
// Route to handle the edit organization form submission
router.post('/edit-organization/:id',
     organizationValidation,
     processEditOrganizationForm);

// Projects page
router.get('/projects', showProjectsPage);

router.get('/project/:id', showProjectDetailsPage);

// Route for new project page
router.get('/new-project',requireRole('admin'), showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', requireRole('admin'), processNewProjectForm, projectValidation);

// Categories page
router.get('/category', showCategoriesPage);

router.get('/category/:id', showCategoryDetailsPage);
     
// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), processNewCategoryForm);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), processEditCategoryForm);

router.get('/edit-project/:id', requireRole('admin'),showEditProjectForm);
router.post('/edit-project/:id',requireRole('admin'),processEditProjectForm);

router.get('/project/:projectId/volunteer', requireLogin, addVolunteerController);
router.get('/project/:projectId/unvolunteer', requireLogin, removeVolunteerController);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);

// Test error route
router.get('/test-error', testErrorPage);

export default router;