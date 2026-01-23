-- 1️⃣ Company
INSERT INTO Company (id, name)
VALUES (1, 'Acme Corp');
-- Create AccountImages entries for all 13 users
INSERT INTO AccountImages (imgpath) VALUES 
('/uploads/pfp/alice.jpeg'),
('/uploads/pfp/bob.jpeg'),
('/uploads/pfp/carol.jpeg'),
('/uploads/pfp/ethan.jpeg'),
('/uploads/pfp/maya.jpeg'),
('/uploads/pfp/jordan.jpeg'),
('/uploads/pfp/sofia.jpeg'),
('/uploads/pfp/noah.jpeg'),
('/uploads/pfp/ava.jpeg'),
('/uploads/pfp/lucas.jpeg'),
('/uploads/pfp/emma.jpeg'),
('/uploads/pfp/ryan.jpeg'),
('/uploads/pfp/priya.jpeg');

-- 2️⃣ Users (employee, manager, coordinator)
INSERT INTO User (
  id,
  first_name,
  last_name,
  username,
  password,
  prof_pic_id,
  companyId,
  admin
) VALUES
(1, 'Alice', 'Holmes', 'alice', 'hashed_pw', 1, 1, false),
(2, 'Bob', 'Manager', 'bob', 'hashed_pw', 2, 1, true),
(3, 'Carol', 'Coordinator', 'carol', 'hashed_pw', 3, 1, true),
(4,  'Ethan',  'Lee',     'ethan',  'hashed_pw', 4, 1, false),
(5,  'Maya',   'Patel',   'maya',   'hashed_pw',5, 1, false),
(6,  'Jordan', 'Kim',     'jordan', 'hashed_pw',6, 1, false),
(7,  'Sofia',  'Garcia',  'sofia',  'hashed_pw',7, 1, false),
(8,  'Noah',   'Brown',   'noah',   'hashed_pw',8, 1, false),
(9,  'Ava',    'Nguyen',  'ava',    'hashed_pw',9, 1, false),
(10, 'Lucas',  'Martinez','lucas',  'hashed_pw',10, 1, false),
(11, 'Emma',   'Wilson',  'emma',   'hashed_pw',11, 1, false),
(12, 'Ryan',   'Chen',    'ryan',   'hashed_pw',12, 1, false),
(13, 'Priya',  'Shah',    'priya',  'hashed_pw',13, 1, false);

-- 3️⃣ Location
INSERT INTO Location (id, name)
VALUES (1, 'San Francisco'),
(2, 'New York'),
(3, 'Los Angeles'),
(4, 'Austin'),
(5, 'Seattle'),
(6, 'Chicago');

-- 4️⃣ Department
INSERT INTO Department (id, name, companyId)
VALUES (1, 'Engineering', 1),
(2, 'Product', 1),
(3, 'Human Resources', 1),
(4, 'Marketing', 1),
(5, 'Operations', 1);

-- 5️⃣ Hire (ID must match User.id = 1)
INSERT INTO Hires (
  id,
  start_date,
  email,
  phone,
  title,
  manager_id,
  coordinator_id,
  location_id,
  department_id
) VALUES (
  1,
  '2026-01-15',
  'alice@acme.com',
  '555-1234',
  'Software Engineer',
  2,  -- Bob (manager)
  3,  -- Carol (coordinator)
  1,  -- location
  1   -- department
),(4, '2026-01-18', 'ethan@acme.com',  '555-1235', 'Frontend Engineer',      2, 3, 2, 1),
(5, '2026-01-20', 'maya@acme.com',   '555-1236', 'Backend Engineer',       2, 3, 1, 1),
(6, '2026-01-22', 'jordan@acme.com', '555-1237', 'Product Analyst',        2, 3, 3, 2),
(7, '2026-01-25', 'sofia@acme.com',  '555-1238', 'UX Designer',            2, 3, 4, 2),
(8, '2026-01-28', 'noah@acme.com',   '555-1239', 'DevOps Engineer',        2, 3, 5, 1),
(9, '2026-02-01', 'ava@acme.com',    '555-1240', 'QA Engineer',            2, 3, 6, 1),
(10, '2026-02-03', 'lucas@acme.com',  '555-1241', 'Marketing Analyst',      2, 3, 1, 4),
(11, '2026-02-05', 'emma@acme.com',   '555-1242', 'Operations Coordinator', 2, 3, 2, 5),
(12, '2026-02-12', 'ryan@acme.com',  '555-1245', 'Data Engineer',    2, 3, 3, 1),
(13, '2026-02-15', 'priya@acme.com', '555-1246', 'UX Researcher',    2, 3, 4, 2);

-- 6️⃣ Task Category
INSERT INTO TaskCategory (
  id,
  name,
  companyId
) VALUES (
  1,
  'Onboarding',
  1
),(2, 'IT Setup', 1),
(3, 'Equipment Provisioning', 1),
(4, 'Compliance & Paperwork', 1),
(5, 'Training', 1),
(6, 'First Week Check-in', 1);
-- 7️⃣ Hire Stat us (1–1 with Hire)
INSERT INTO HireStatus (
  id,
  lastupdatedby,
  task_id,
  time
) VALUES 
(1, 2, 3, '2026-01-22'),
(4, 2, 4, '2026-01-22'),
(5, 2, 5, '2026-01-25'),
(6, 2, 6, '2026-01-28'),
(7, 2, 1, '2026-02-01'),
(8, 2, 2, '2026-02-03'),
(9, 2, 3, '2026-02-05'),
(10, 2, 4, '2026-02-08'),
(11, 2, 5, '2026-02-10'),
(12, 2, 6, '2026-02-12'),
(13, 2, 1, '2026-02-15');





