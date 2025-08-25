"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // USERS
    await queryInterface.bulkInsert("Users", [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: "hashedpassword",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Student One",
        email: "student1@example.com",
        password: "hashedpassword",
        role: "student",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Student Two",
        email: "student2@example.com",
        password: "hashedpassword",
        role: "student",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // ambil ID Users
    const users = await queryInterface.sequelize.query(
      `SELECT id, email FROM "Users";`
    );
    const userRows = users[0];
    const admin = userRows.find((u) => u.email === "admin@example.com");
    const student1 = userRows.find((u) => u.email === "student1@example.com");
    const student2 = userRows.find((u) => u.email === "student2@example.com");

    // COURSES
    await queryInterface.bulkInsert("Courses", [
      {
        title: "Fullstack Web Development",
        description: "Belajar Node.js, React, dan PostgreSQL",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Data Science Fundamentals",
        description: "Belajar Python, Pandas, dan Machine Learning dasar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const courses = await queryInterface.sequelize.query(
      `SELECT id, title FROM "Courses";`
    );
    const courseRows = courses[0];
    const course1 = courseRows.find((c) => c.title.includes("Fullstack"));
    const course2 = courseRows.find((c) => c.title.includes("Data Science"));

    // MODULES
    await queryInterface.bulkInsert("Modules", [
      {
        title: "JavaScript Basics",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Express & Sequelize",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "React Fundamentals",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Python for Data Science",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const modules = await queryInterface.sequelize.query(
      `SELECT id, title FROM "Modules";`
    );
    const moduleRows = modules[0];
    const jsModule = moduleRows.find((m) => m.title.includes("JavaScript"));
    const expressModule = moduleRows.find((m) => m.title.includes("Express"));
    const reactModule = moduleRows.find((m) => m.title.includes("React"));
    const pythonModule = moduleRows.find((m) => m.title.includes("Python"));

    // COURSE_MODULES
    await queryInterface.bulkInsert("CourseModules", [
      {
        CourseId: course1.id,
        ModuleId: jsModule.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CourseId: course1.id,
        ModuleId: expressModule.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CourseId: course1.id,
        ModuleId: reactModule.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CourseId: course2.id,
        ModuleId: pythonModule.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // CHECKPOINTS
    await queryInterface.bulkInsert("Checkpoints", [
      {
        title: "Quiz JavaScript",
        CourseId: course1.id,
        max_score: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Mini Project Express",
        CourseId: course1.id,
        max_score: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Quiz Python",
        CourseId: course2.id,
        max_score: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const checkpoints = await queryInterface.sequelize.query(
      `SELECT id, title FROM "Checkpoints";`
    );
    const checkpointRows = checkpoints[0];
    const quizJS = checkpointRows.find((c) => c.title.includes("JavaScript"));
    const miniExpress = checkpointRows.find((c) => c.title.includes("Express"));

    // ENROLLMENTS
    await queryInterface.bulkInsert("Enrollments", [
      {
        UserId: student1.id,
        CourseId: course1.id,
        status: "active",
        progress: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: student2.id,
        CourseId: course1.id,
        status: "active",
        progress: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: student2.id,
        CourseId: course2.id,
        status: "active",
        progress: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // SUBMISSIONS
    await queryInterface.bulkInsert("Submissions", [
      {
        UserId: student1.id,
        CheckpointId: quizJS.id,
        submission_link: "http://github.com/student1/js-quiz",
        grade: 90,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: student2.id,
        CheckpointId: miniExpress.id,
        submission_link: "http://github.com/student2/express-mini",
        grade: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Submissions", null, {});
    await queryInterface.bulkDelete("Enrollments", null, {});
    await queryInterface.bulkDelete("Checkpoints", null, {});
    await queryInterface.bulkDelete("CourseModules", null, {});
    await queryInterface.bulkDelete("Modules", null, {});
    await queryInterface.bulkDelete("Courses", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
