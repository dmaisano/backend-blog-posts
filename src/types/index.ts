import { SortBy, SortDirection } from "../constants";

// ? reference: https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type
export type SortByType = typeof SortBy[number];

export type SortDirectionType = typeof SortDirection[number];

export interface IPost {
  author: string;
  authorId: number;
  likes: number;
  popularity: number;
  reads: number;
  tags: string[];
}
