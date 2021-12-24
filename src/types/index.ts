import { SortBy, SortDirection } from "../constants";

// ? reference: https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type
export type SortByType = typeof SortBy[number];

export type SortDirectionType = typeof SortDirection[number];
