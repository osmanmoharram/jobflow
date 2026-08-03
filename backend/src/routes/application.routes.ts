import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createApplicationSchema, updateApplicationSchema } from "../validators/application.validator.js";
import { index, store  } from "../controllers/application.controller.js";

const router = Router();

router.use(authenticate);

router.get('/', index)
router.post('/', validate(createApplicationSchema), store)

export default router;