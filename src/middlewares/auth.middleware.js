import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model"


export const verifyJWT = asyncHandler(async (req, _, next) => {
   try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
     if (!token){
         throw new ApiError(401, "unauthorized request")
     }
 
     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN)
 
     const user = await User.findById(decodedToken?._id).select(-password -refreshToken)
 
     if(!user){
         throw new ApiError(401, "Invalid access token")
     }
 
     req.user = user
     next()
   } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
   }
}) 