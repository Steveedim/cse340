CREATE TABLE organization (
	organization_id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR (255) NOT NULL,
	logo_filename VARCHAR (255) NOT NULL
)

SELECT * FROM organization;

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE public.service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(100) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES public.organization(organization_id)
        ON DELETE CASCADE
);
INSERT INTO public.service_project
(organization_id, title, description, location, project_date)
VALUES
(1, 'Community Cleanup', 'Cleaning local streets', 'Lagos', '2026-06-01'),

(1, 'Food Drive', 'Providing food for families', 'Abuja', '2026-06-05'),

(1, 'School Support', 'Giving school supplies', 'Port Harcourt', '2026-06-10'),

(1, 'Health Outreach', 'Free health checks', 'Enugu', '2026-06-15'),

(1, 'Tree Planting', 'Environmental awareness', 'Ibadan', '2026-06-20'),

(2, 'Coding Workshop', 'Teaching web development', 'Lagos', '2026-06-03'),

(2, 'Youth Mentorship', 'Career guidance event', 'Uyo', '2026-06-07'),

(2, 'Sports Program', 'Community football project', 'Calabar', '2026-06-11'),

(2, 'Library Upgrade', 'Renovating local library', 'Jos', '2026-06-16'),

(2, 'Women Empowerment', 'Skill acquisition training', 'Kaduna', '2026-06-21'),

(3, 'Beach Cleanup', 'Cleaning coastal areas', 'Lekki', '2026-06-04'),

(3, 'Scholarship Program', 'Educational sponsorship', 'Benin', '2026-06-09'),

(3, 'Medical Outreach', 'Free medication support', 'Kano', '2026-06-14'),

(3, 'Elderly Care Visit', 'Support for elderly homes', 'Aba', '2026-06-18'),

(3, 'Community Farming', 'Agricultural support project', 'Makurdi', '2026-06-25');

CREATE TABLE public.category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE public.project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES public.service_project(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES public.category(category_id)
        ON DELETE CASCADE
);


INSERT INTO public.category (name)
VALUES
('Community Service'),
('Education'),
('Health');


INSERT INTO public.project_category (project_id, category_id)
VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 1),
(6, 2),
(7, 1),
(8, 2),
(9, 3),
(10, 1),
(11, 1),
(12, 2),
(13, 3),
(14, 1),
(15, 2);
SELECT * FROM public.project_category