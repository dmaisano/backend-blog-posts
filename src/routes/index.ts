import { Response, Router } from "express";

const router = Router();

router.get(`/`, (_, res: Response) => {
  res.json({
    success: true,
  });
});

export default router;

export { default as postsRoutes } from "./posts";
