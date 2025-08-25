const { Checkpoint, Course } = require("../models");

class CheckpointController {
  static async getCheckpoints(req, res, next) {
    try {
      const checkpoints = await Checkpoint.findAll({
        include: [{ model: Course, attributes: ["id", "title"] }],
      });
      res.json(checkpoints);
    } catch (err) {
      next(err);
    }
  }

  static async getCheckpointById(req, res, next) {
    try {
      const { id } = req.params;
      const checkpoint = await Checkpoint.findByPk(id, {
        include: [{ model: Course, attributes: ["id", "title"] }],
      });
      if (!checkpoint)
        return res.status(404).json({ message: "Checkpoint not found" });
      res.json(checkpoint);
    } catch (err) {
      next(err);
    }
  }

  static async createCheckpoint(req, res, next) {
    try {
      const { title, type, course_id, max_score, submission_type } = req.body;
      const newCheckpoint = await Checkpoint.create({
        title,
        type,
        course_id,
        max_score,
        submission_type,
      });
      res.status(201).json(newCheckpoint);
    } catch (err) {
      next(err);
    }
  }

  static async updateCheckpoint(req, res, next) {
    try {
      const { id } = req.params;
      const [updated] = await Checkpoint.update(req.body, {
        where: { id },
        returning: true,
      });
      if (!updated)
        return res.status(404).json({ message: "Checkpoint not found" });
      res.json({ message: "Checkpoint updated" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCheckpoint(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Checkpoint.destroy({ where: { id } });
      if (!deleted)
        return res.status(404).json({ message: "Checkpoint not found" });
      res.json({ message: "Checkpoint deleted" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CheckpointController;
