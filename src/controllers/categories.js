import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId,
    getCategoriesByServiceProjectId,
    updateCategoryAssignments
} from "../models/categories.js";

import { getProjectDetails } from "../models/project.js";

// Categories list page
const showCategoriesPage = async (req, res) => {

    const categories = await getAllCategories();

    const title = 'Service Categories';

    res.render('categories', {
        title,
        categories
    });
};


// Category details page
const showCategoryDetailsPage = async (req, res) => {

    const categoryId = req.params.id;

    const category =
        await getCategoryById(categoryId);

    const projects =
        await getProjectsByCategoryId(categoryId);

    const title = 'Category Details';

    res.render('category', {
        title,
        category,
        projects
    });
};


const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const showNewCategoryForm = (req, res) => {
    res.render('new-category', {
        title: 'Create Category'
    });
};

const processNewCategoryForm = async (req, res) => {

    const { name } = req.body;

    await createCategory(name);

    req.flash('success', 'Category created successfully');

    res.redirect('/category');
};

const showEditCategoryForm = async (req, res) => {

    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);

    res.render('edit-category', {
        title: 'Edit Category',
        category
    });
};

const processEditCategoryForm = async (req, res) => {

    const categoryId = req.params.id;
    const { name } = req.body;

    await updateCategory(categoryId, name);

    req.flash('success', 'Category updated successfully');

    res.redirect('/category');
};

export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
};
