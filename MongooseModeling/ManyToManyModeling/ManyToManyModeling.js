// 🟢 Many-to-Many Relationship in MongoDB

// 👉 Definition:

// A many-to-many (M:N) relationship means:

// One document can be related to many documents,

// and those documents can also be related back to many documents.
// A User can like many Posts, and a Post can be liked by many Users.

// ✅ Example: Students ↔ Courses
// 1. Student Schema

import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  // Many courses a student is enrolled in
  courses: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
  ]
});

const Student = mongoose.model("Student", studentSchema);

// 2. Course Schema

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  // Many students can join this course
  students: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Student" }
  ]
});

const Course = mongoose.model("Course", courseSchema);

// 3. Creating Data

// 1. Create courses
const course1 = await Course.create({ title: "MongoDB Basics", description: "Learn MongoDB" });
const course2 = await Course.create({ title: "React Mastery", description: "Deep dive into React" });

// 2. Create student with course references
const student = await Student.create({
  name: "Abdullah",
  email: "abdullah@gmail.com",
  courses: [course1._id, course2._id]
});

// 3. Update each course to include this student
await Course.findByIdAndUpdate(course1._id, { $push: { students: student._id } });
await Course.findByIdAndUpdate(course2._id, { $push: { students: student._id } });


// 4. Fetching Data (Populate Both Sides)

// 👉 Get a student with enrolled courses:

const studentWithCourses = await Student.findOne({ name: "Abdullah" }).populate("courses");
console.log(studentWithCourses);

// 👉 Get a course with enrolled students:
const courseWithStudents = await Course.findOne({ title: "MongoDB Basics" }).populate("students");
console.log(courseWithStudents);


// 5. Example Output

// Student with courses:

// {
//   "name": "Abdullah",
//   "email": "abdullah@gmail.com",
//   "courses": [
//     { "_id": "64abc1", "title": "MongoDB Basics", "description": "Learn MongoDB" },
//     { "_id": "64abc2", "title": "React Mastery", "description": "Deep dive into React" }
//   ]
// }


// Course with students:

// {
//   "title": "MongoDB Basics",
//   "description": "Learn MongoDB",
//   "students": [
//     { "_id": "64def1", "name": "Abdullah", "email": "abdullah@gmail.com" }
//   ]
// }




// Alternative: Create a third “junction/bridge collection” (like Enrollments) to handle relationships if it becomes very complex.
// Example:

(Optional)
const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  enrolledAt: Date
});