import { Request, Response, Router } from "express";
import { SortBy, SortDirection } from "../constants";
import postsService from "../services/posts.service";
import { SortByType, SortDirectionType } from "../types";

const router = Router();

router.get(
  `/`,
  async (
    req: Request<
      {},
      {},
      {},
      {
        tags: string;
        sortBy?: SortByType;
        direction?: SortDirectionType;
      }
    >,
    res: Response,
  ) => {
    const { tags, sortBy = `id`, direction = `asc` } = req.query;

    if (!tags) {
      return res.status(400).json({
        error: "Tags parameter is required",
      });
    }

    if (!SortBy.includes(sortBy)) {
      return res.status(400).json({
        error: "sortBy parameter is invalid",
      });
    }

    if (!SortDirection.includes(direction)) {
      return res.status(400).json({
        error: "direction parameter is invalid",
      });
    }

    const parsedTags = tags.split(`,`);

    console.log({ tags, sortBy, direction, parsedTags });

    const posts = await postsService.fetchPosts(parsedTags, sortBy, direction);

    return res.json(posts);
  },
);

export default router;
