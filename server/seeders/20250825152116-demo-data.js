"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
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
        content: "Intro ke JavaScript",
        content_type: "text",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Express & Sequelize",
        content: "Belajar backend dengan Express dan Sequelize",
        content_type: "text",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "React Fundamentals",
        content: "Belajar dasar React",
        content_type: "text",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Python for Data Science",
        content: "Belajar Python untuk data science",
        content_type: "text",
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

    // COURSE_MODULES (relasi Course ↔ Module)
    await queryInterface.bulkInsert("CourseModules", [
      {
        CourseId: course1.id,
        ModuleId: jsModule.id,
        order_index: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CourseId: course1.id,
        ModuleId: expressModule.id,
        order_index: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CourseId: course1.id,
        ModuleId: reactModule.id,
        order_index: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CourseId: course2.id,
        ModuleId: pythonModule.id,
        order_index: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // CHECKPOINTS
    await queryInterface.bulkInsert("Checkpoints", [
      {
        title: "Quiz JavaScript",
        CourseId: course1.id,
        type: "quiz",
        max_score: 100,
        submission_type: "form",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Mini Project Express",
        CourseId: course1.id,
        type: "project",
        max_score: 100,
        submission_type: "repo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Quiz Python",
        CourseId: course2.id,
        type: "quiz",
        max_score: 100,
        submission_type: "form",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Checkpoints", null, {});
    await queryInterface.bulkDelete("CourseModules", null, {});
    await queryInterface.bulkDelete("Modules", null, {});
    await queryInterface.bulkDelete("Courses", null, {});
  },
};
