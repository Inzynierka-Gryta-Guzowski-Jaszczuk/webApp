import { HydratedDocument, Types } from "mongoose";
import { UserDocument } from "../models/User";

interface UserDTO {
  userId: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  image: string;
  my_recipes: Types.ObjectId[];
  saved_recipes: Types.ObjectId[];
}
  const userToDTO = (user: HydratedDocument<UserDocument>): UserDTO => {
    return {
        userId: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        my_recipes: user.my_recipes,
        saved_recipes: user.saved_recipes,
    }
}

module.exports = userToDTO