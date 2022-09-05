import express from "express";
import controllers from "../controllers";
import authenticate from "../middleware/auth.middleware";

const router = express.Router();

router.get('/', (req, res) => {

  res.send('Welcome');

});

router.get('/github/repo-single', authenticate, controllers.getSingleRepo);
router.get('/github/repo-multiple', authenticate, controllers.getMultipleRepos);


export default router;
