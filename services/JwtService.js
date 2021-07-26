import { JWT_TOKEN } from "./../config";
import jwt from "jsonwebtoken";

class JwtService {
  static sign(payload, expiry = "60s", secret = JWT_TOKEN) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }

  static verify(token, secret = JWT_TOKEN) {
    return jwt.verify(token, secret);
  }
}

export default JwtService;
