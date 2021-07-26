import CustomErrorHandler from "./../services/CustomeErrorHandler";
import JwtService from "./../services/JwtService";
const auth = (req, res, next) => {
  let authHeader = req.headers.autherization;
  console.log(authHeader);

  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorised());
  }

  const token = authHeader.split(" ")[1];
  try {
    const { _id, role } = JwtService.verify(token);
    const user = {
      _id: _id,
      role: role,
    };

    req.user = user;
    next();
  } catch (err) {
    return next(err);
  }
};

export default auth;
