import Joi from "joi";
import bcrypt from "bcrypt";
import { User } from "./../../models/index";
import JwtService from "./../../services/JwtService";
import CustomErrorHandler from "./../../services/CustomeErrorHandler";
const loginController = {
  async login(req, res, next) {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }

      const match = await bcrypt.compare(req.body.password, user.password);

      if (!match) {
        return next(CustomErrorHandler.wrongCredentials());
      }

      let accessToken = JwtService.sign({
        _id: user._id,
        role: user.role,
      });

      res.status(200).json({ accesstoken: accessToken });

      console.log(accessToken);
    } catch (err) {}
  },
};

export default loginController;
