import express from "express";
import controllers from "../controllers";

const router = express.Router();

router.get('/', (req, res) => {

  res.send('Welcome');

});

router.get('/github/repo-info', controllers.getRepoInfo);


export default router;
