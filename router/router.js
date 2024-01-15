import { Router } from "express"
import { userRoute } from "./userRoute.js"

export const router = Router()

router.use('/', userRoute)
