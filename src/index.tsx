import { isValidDateString } from "./helpers";

import { useState } from "react";

type SetSortKey<T> = (sortBy: keyof T) => void;
type SetSortOrder = (sortOrder: "asc" | "desc") => void;
type Sorted<T> = T[];

type SortableReturn<T = Record<string, string>> = {
  setSortKey: SetSortKey<T>;
  setSortDir: SetSortOrder;
  readonly sorted: Sorted<T>;
  readonly sortKey: keyof T;
  readonly sortOrder: "asc" | "desc";
};

type DefaultOptions<T> = {
  defaultSortKey: keyof T;
  defaultOrder?: "asc" | "desc";
};

/**
 * Sorts an array of objects by a given key
 * @param data - The data to sort
 * @param options.defaultSortKey  - The default sort key
 * @param option.defaultDir - The default sort direction;
 * @returns A tuple containing the sorted data and a function to set the sort key
 */
export function useSortable<T extends Record<string, string>>(
  data: T[],
  options?: DefaultOptions<T>
): SortableReturn<T> {
  const [sortKey, _setSortKey] = useState<keyof T>(
    options?.defaultSortKey ?? ""
  );
  const [ascending, setAscending] = useState<boolean>(
    options?.defaultOrder === "asc" ?? true
  );

  const sorted = data?.sort((a, b) => {
    if (ascending) {
      if (isValidDateString(a[sortKey])) {
        return new Date(a[sortKey]).getTime() - new Date(b[sortKey]).getTime();
      }
      if (typeof Number(a[sortKey]) === "number") {
        return Number(a[sortKey]) - Number(b[sortKey]);
      }
      return a[sortKey].charCodeAt(0) - b[sortKey].charCodeAt(0);
    }
    if (isValidDateString(a[sortKey])) {
      return new Date(b[sortKey]).getTime() - new Date(a[sortKey]).getTime();
    }
    if (typeof Number(a[sortKey]) === "number") {
      return Number(b[sortKey]) - Number(a[sortKey]);
    }
    return b[sortKey].charCodeAt(0) - a[sortKey].charCodeAt(0);
  });

  const setSortDir = (sortOrder: "asc" | "desc") => {
    setAscending(sortOrder === "asc");
  };

  const setSortKey = (newSortKey: keyof T) => {
    if (newSortKey === sortKey) {
      setAscending(!ascending);
    } else {
      _setSortKey(newSortKey);
      setAscending(true);
    }
  };
  return {
    sorted,
    setSortKey,
    setSortDir,
    sortKey,
    sortOrder: ascending ? "asc" : "desc",
  };
}

export default useSortable;
