const { Submission, User, Checkpoint } = require("../models");

class SubmissionController {
  static async getSubmissions(req, res, next) {
    try {
      const submissions = await Submission.findAll({
        include: [
          { model: User, attributes: ["id", "name"] },
          { model: Checkpoint, attributes: ["id", "title"] },
        ],
      });
      res.json(submissions);
    } catch (err) {
      next(err);
    }
  }

  static async getSubmissionByUser(req, res, next) {
    try {
      const { UserId } = req.params;
      const submissions = await Submission.findAll({
        where: { UserId: UserId },
        include: [{ model: Checkpoint, attributes: ["id", "title"] }],
      });
      res.json(submissions);
    } catch (err) {
      next(err);
    }
  }

  static async createSubmission(req, res, next) {
    try {
      const { UserId, CheckpointId, submission_link } = req.body;
      const newSubmission = await Submission.create({
        UserId,
        CheckpointId,
        submission_link,
        submitted_at: new Date(),
        grade: 0
      });
      res.status(201).json(newSubmission);
    } catch (err) {
      next(err);
    }
  }

  static async gradeSubmission(req, res, next) {
    try {
      const { UserId, CheckpointId } = req.params;
      const { grade, feedback } = req.body;
      const [updated] = await Submission.update(
        { grade, feedback },
        { where: { UserId, CheckpointId }, returning: true }
      );
      if (!updated) return res.status(404).json({ message: "Submission not found" });
      res.json({ message: "Submission graded" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SubmissionController;