# School database design

## Tables

- **students** stores one row per student. `student_id` is its primary key; `name` and `email` are required. The email is unique so the same email cannot be assigned to two student records.
- **courses** stores one row per course. `course_id` is its primary key and `course_name` is required and unique.
- **enrolments** records that a student is enrolled in a course and stores that student's grade for that course. `enrolment_id` is the primary key. `student_id` and `course_id` are required foreign keys referencing `students` and `courses`. The pair `(student_id, course_id)` is unique, so a student cannot enrol in the same course twice.

## Relationships

A student can have many enrolments, while each enrolment belongs to one student. This is a **one-to-many** relationship from `students` to `enrolments`.

A course can have many enrolments, while each enrolment belongs to one course. This is a **one-to-many** relationship from `courses` to `enrolments`.

Together, students and courses have a **many-to-many** relationship: a student can take several courses, and each course can have several students. Relational databases represent this using a join table. Here, `enrolments` joins the two tables by storing a student ID and a course ID for each relationship. It also holds relationship-specific data: the grade. The unique constraint on the ID pair prevents duplicate enrolments.

## Index

I would add an index on `enrolments(course_id)`. The student list for one course and course counts per course both search or group enrolments by `course_id`. The index can make those lookups faster as the enrolments table grows. The primary key, unique email, and unique student/course pair already create indexes in SQLite for their respective keys.

```sql
CREATE INDEX idx_enrolments_course_id ON enrolments(course_id);
```
