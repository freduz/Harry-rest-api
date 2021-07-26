import Joi from "joi";
import CustomErrorHandler from "./../../services/CustomeErrorHandler";
import JwtService from "./../../services/JwtService";
import bcrypt from "bcrypt";
import { User } from "./../../models";
const registerController = {
  async register(req, res, next) {
    // @register function logic goes here

    // @validation using joi librabry

    const registerationSchema = Joi.object({
      name: Joi.string().min(3).max(25).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      repeat_password: Joi.ref("password"),
    });

    // @catching the error
    const { error } = registerationSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    // @check the email is already taken
    try {
      const exist = await User.exists({ email: req.body.email });

      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This email is already taken")
        );
      }
    } catch (err) {
      console.log(err);
      return next(err);
    }
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    let accessToken;
    try {
      const result = await user.save();
      accessToken = JwtService.sign({
        _id: result._id,
        role: result.role,
      });
    } catch (err) {
      return next(err);
    }

    return res.json({ accessToken: accessToken });
  },
};

export default registerController;
