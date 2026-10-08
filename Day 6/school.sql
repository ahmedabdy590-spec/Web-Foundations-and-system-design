-- Day 6: School database
-- SQLite-compatible schema, sample data, and required queries.

PRAGMA foreign_keys = ON;

-- A student can enrol in many courses through the Enrolments table.
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

-- A course can have many students through the Enrolments table.
CREATE TABLE courses (
    course_id INTEGER PRIMARY KEY,
    course_name TEXT NOT NULL UNIQUE
);

-- Join table for the many-to-many student/course relationship.
-- The composite UNIQUE constraint prevents duplicate enrolment pairs.
CREATE TABLE enrolments (
    enrolment_id INTEGER PRIMARY KEY,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    grade TEXT,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    UNIQUE (student_id, course_id)
);

-- Helps look up enrolments by course and count students per course.
CREATE INDEX idx_enrolments_course_id ON enrolments(course_id);

INSERT INTO students (student_id, name, email) VALUES
    (1, 'Amina Patel', 'amina.patel@example.com'),
    (2, 'Abubakar said', 'abu.bakar@example.com'),
    (3, 'Chloe Mensah', 'chloe.mensah@example.com'),
    (4, 'Daniel Kimani', 'daniel.kimani@example.com');

INSERT INTO courses (course_id, course_name) VALUES
    (1, 'Database Fundamentals'),
    (2, 'Web Development'),
    (3, 'Python Programming');

INSERT INTO enrolments (enrolment_id, student_id, course_id, grade) VALUES
    (1, 1, 1, 'A'),
    (2, 1, 2, 'B+'),
    (3, 2, 1, 'B'),
    (4, 2, 3, 'A-'),
    (5, 3, 2, 'A');

-- 1. All courses for one student, selected by name.
SELECT s.name AS student_name, c.course_name, e.grade
FROM students AS s
JOIN enrolments AS e ON e.student_id = s.student_id
JOIN courses AS c ON c.course_id = e.course_id
WHERE s.name = 'Amina Patel'
ORDER BY c.course_name;

-- 2. All students enrolled on one course, selected by course name.
SELECT c.course_name, s.name AS student_name, e.grade
FROM courses AS c
JOIN enrolments AS e ON e.course_id = c.course_id
JOIN students AS s ON s.student_id = e.student_id
WHERE c.course_name = 'Web Development'
ORDER BY s.name;

-- 3. Number of students per course, including courses with zero students.
SELECT c.course_name, COUNT(e.student_id) AS student_count
FROM courses AS c
LEFT JOIN enrolments AS e ON e.course_id = c.course_id
GROUP BY c.course_id, c.course_name
ORDER BY c.course_name;

-- 4. Students who have no enrolments.
SELECT s.student_id, s.name, s.email
FROM students AS s
LEFT JOIN enrolments AS e ON e.student_id = s.student_id
WHERE e.student_id IS NULL
ORDER BY s.name;

-- 5. Update one enrolment's grade.
UPDATE enrolments
SET grade = 'A-'
WHERE student_id = 1
  AND course_id = 2;