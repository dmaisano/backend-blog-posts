import axios from "axios";
import { IPost, SortByType, SortDirectionType } from "../types";
import moment from "moment";

class PostsService {
  // this will serve as a simple in-memory cache
  private cachedPosts: {
    [tag: string]: {
      posts: IPost[];
      timestamp: Date;
    };
  } = {};

  async fetchPosts(
    tags: string[],
    sortBy: SortByType,
    direction: SortDirectionType,
  ): Promise<{ posts: IPost[] }> {
    const clientRes: {
      posts: IPost[];
    } = {
      posts: [],
    };

    const pendingResults: Promise<{
      tag: string;
      posts: IPost[];
    }>[] = [];

    for (const tag of tags) {
      const cachedPost = this.cachedPosts[tag];
      if (cachedPost) {
        const now = moment();

        // for the purpose of this demo, we will consider 30sec to our expiration time for what we will consider to be "stale data"
        const expTime = 1000 * 30;

        const isStale =
          now.diff(moment(cachedPost.timestamp), `milliseconds`) >= expTime;

        console.log({ isStale });

        if (!isStale) {
          // data is not stale yet, we can continue to use
          clientRes.posts.push(...cachedPost.posts);
          continue;
        }
      }

      const response = axios.get<{ posts: IPost[] }>(
        `https://api.hatchways.io/assessment/blog/posts`,
        {
          params: {
            tag,
          },
        },
      );

      pendingResults.push(
        response.then((res) => {
          return {
            tag,
            posts: res.data.posts,
          };
        }),
      );
    }

    const fetchedResults = await Promise.all(pendingResults);

    if (fetchedResults) {
      for (const { tag, posts } of fetchedResults) {
        clientRes.posts.push(...(posts && posts.length ? posts : []));

        // adding the fetched data to the cache
        this.cachedPosts[tag] = {
          posts,
          timestamp: new Date(),
        };

        const obj = this.cachedPosts[tag];

        console.log(obj.timestamp);
        console.log(obj.posts.length);
      }
    }

    return {
      posts: this.sortPosts(clientRes.posts, sortBy, direction),
    };
  }

  private sortPosts(
    posts: IPost[],
    sortBy: SortByType,
    direction: SortDirectionType,
  ) {
    // ? reference: https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
    return posts.sort((a, b) => {
      if (direction === `asc`) {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
  }
}

export default new PostsService();
