import { request, response } from "express";

export const isAdminRole = (req, res = response, next) => {
  const user = req.user;

  if (user.role !== "ADMIN_ROLE") {
    return res.status(401).json({
      message: "You are not allowed to stay here, you aren't admin role",
    });
  }

  next();
};
