import userModel from "./user.schema.js";

export const createNewUserRepo = async (user) => {
    return await new userModel(user).save()
}