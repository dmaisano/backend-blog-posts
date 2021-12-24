import { Response, Router } from "express";

const router = Router();

router.get(`/`, (_, res: Response) => {
  res.send(`hello world`);
});

export default router;
