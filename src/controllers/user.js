import { Message, statusCodes } from "../core/common/constant.js";
import * as userService from '../services/user.js';

export const addUser  = async (req, res) => {
  const userData = await userService.registerUser(req);
  res.status(statusCodes?.created).send(userData);
};

export const userLogin = async (req, res, next) => {
  const data = await userService.loginUser(req, res, next);
  res
    .status(statusCodes?.ok)
    .cookie("accessToken", data?.accessToken, data?.options)
    .cookie("refreshToken", data?.refreshToken, data?.options)
    .send({ data: data?.loginUser, accessToken: data?.accessToken,refreshToken:data?.refreshToken });
};
