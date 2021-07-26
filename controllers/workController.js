import CustomErrorHandler from "./../services/CustomeErrorHandler";
import { workSchedule, BlockApps } from "./../models/";

import Joi from "joi";
const workController = {
  // @controller function for adding the work time
  async addWorkTime(req, res, next) {
    const workSchema = Joi.object({
      day: Joi.string().required(),
      startTime: Joi.string().required(),
      endTime: Joi.string().required(),
      workTime: Joi.array().required(),
      nonWorkTime: Joi.array().required(),
    });

    const { error } = workSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    try {
      const workDay = await workSchedule.exists({ day: req.body.day });

      if (workDay) {
        return next(
          CustomErrorHandler.alreadyExist("Work day is already scheduled")
        );
      }
    } catch (err) {
      return next(err);
    }

    const workData = new workSchedule({
      day: req.body.day,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      workTime: req.body.workTime,
      nonWorkTime: req.body.nonWorkTime,
    });

    try {
      const workDay = await workData.save();
      console.log(workDay);
      res.status(201).json({
        status: "work schedule created..",
        data: workDay,
      });
    } catch (err) {
      return next(err);
    }
  },

  // @controller function for blocking the app list

  async blockApp(req, res, next) {
    try {
      const appData = {
        workTime: req.body.workTime,
        nonWorkTime: req.body.nonWorkTime,
      };

      const updatedData = await workSchedule.findByIdAndUpdate(
        req.params.id,
        appData,
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({
        status: "Apps block list generated",
        data: {
          updatedData,
        },
      });
    } catch (err) {
      return next(err);
    }
    // console.log(req.body);
  },

  // @ controller function for getting all work days

  async getAllWorkTime(req, res, next) {
    try {
      const workDaysList = await workSchedule.find({});
      res.status(200).json(workDaysList);
    } catch (err) {
      return next(err);
    }
  },
};

export default workController;
