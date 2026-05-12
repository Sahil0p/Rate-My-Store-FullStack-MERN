// import express from "express";
// import * as owner from "../controllers/owner.controller.js";
// import auth from "../middleware/auth.js";
// import validateRole from "../middleware/validateRole.js";

// const router = express.Router();
// router.use(auth, validateRole("OWNER"));

// router.get("/dashboard", owner.ownerDashboard);
// router.get("/ratings/:id", owner.ratingsForMyStore);

// export default router;

import express from "express";
import auth from "../middleware/auth.js";
import validateRole from "../middleware/validateRole.js";
import { ownerDashboard } from "../controllers/owner.controller.js";

const router = express.Router();

router.use(auth, validateRole("OWNER"));
router.get("/dashboard", ownerDashboard);

export default router;
