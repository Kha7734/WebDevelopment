// const Board = require('../models/boardModel.js');
import boardModel from "../models/boardModel.js";

const boardController = {
  getAllBoards: async (req, res) => {
    try {
      const queryObj = { ...req.query };
      const excludedFields = ["page", "sort", "limit", "fields"];
      excludedFields.forEach((el) => delete queryObj[el]);

      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`,
      );

      let query = boardModel.find(JSON.parse(queryStr));

      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      }

      const boards = await query;

      res.status(200).json({
        status: "success",
        results: boards.length,
        data: {
          boards,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const board = await boardModel.findById(req.params.id);
      res.status(200).json({
        status: "success",
        data: {
          board,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  },
  createBoard: async (req, res) => {
    try {
      const newBoard = await boardModel.create(req.body);
      console.log(req.body);
      res.status(201).json({
        status: "success",
        data: {
          board: newBoard,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  },
  updateBoard: async (req, res) => {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = [
        "addr",
        "location",
        "isPlan",
        "advertisementForm",
        "locationCategory",
      ];
      const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update),
      );

      if (!isValidOperation) {
        return res.status(404).send({ error: "Invalid updates!" });
      }

      const board = await boardModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );

      res.status(200).json({
        status: "success",
        data: {
          board,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  },
  deleteBoard: async (req, res) => {
    try {
      const board = await boardModel.findByIdAndDelete(req.params.id);
      if (!board) {
        return res.status(404).json({
          status: "fail",
          message: err,
        });
      }

      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  },
};

export default boardController;
