import cors from "cors";
import express from "express";
import routes, { postsRoutes } from "./routes";

const main = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(`/api`, routes);
  app.use(`/api/posts`, postsRoutes);

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

main().catch(console.error);
