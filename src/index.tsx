import { useState } from "react";

type SetSortKey<T> = (sortBy: keyof T) => void;
type SetSortOrder = (sortOrder: "asc" | "desc") => void;
type Sorted<T> = T[];

type SortableReturn<T = Record<string, string>> = {
  setSortKey: SetSortKey<T>;
  setSortOrder: SetSortOrder;
  readonly sorted: Sorted<T>;
  readonly sortKey: keyof T;
  readonly sortOrder: "asc" | "desc";
};

type DefaultOptions<T> = {
  defaultSortKey: keyof T;
  defaultSortOrder?: "asc" | "desc";
};

/**
 * Sorts an array of objects by a given key
 * @param data - The data to sort
 * @param options.defaultSortKey  - The default sort key
 * @param option.defaultDir - The default sort direction;
 * @returns A tuple containing the sorted data and a function to set the sort key
 */
export function useSortable<T extends Record<string, string | number | Date>>(
  data: T[],
  options?: DefaultOptions<T>
): SortableReturn<T> {
  const [sortKey, _setSortKey] = useState<keyof T>(
    options?.defaultSortKey ?? ""
  );
  const [ascending, setAscending] = useState<boolean>(
    options?.defaultSortOrder === "asc" ?? true
  );

  const sorted = data?.sort((a, b) => {
    const candidateA = a[sortKey];
    const candidateB = b[sortKey];
    if (ascending) {
      if (candidateA instanceof Date) {
        return candidateA.getTime() - (candidateB as Date).getTime();
      }
      if (typeof Number(candidateA) === "number") {
        return Number(candidateA) - Number(candidateB);
      }
      return (
        String(candidateA).charCodeAt(0) - String(candidateB).charCodeAt(0)
      );
    }
    if (candidateA instanceof Date) {
      return (candidateB as Date).getTime() - candidateA.getTime();
    }
    if (typeof Number(candidateA) === "number") {
      return Number(candidateB) - Number(candidateA);
    }
    return String(candidateB).charCodeAt(0) - String(candidateA).charCodeAt(0);
  });

  const setSortOrder = (sortOrder: "asc" | "desc") => {
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
    setSortOrder,
    sortKey,
    sortOrder: ascending ? "asc" : "desc",
  };
}

export default useSortable;
