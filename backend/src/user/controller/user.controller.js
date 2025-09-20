import { createNewUserRepo } from "../models/user.repository.js";

export const createNewUser = async (req, res) => {
  try {
    const result = await createNewUserRepo(req.body);
    res.send(result)
  } catch (err) {
    if (err.code == "11000") {
      console.log("Email already registered");
    }
  }
};

