import { useSortable } from "./";
import { act, renderHook } from "@testing-library/react-hooks";

// mock timer using jest
jest.useFakeTimers();

describe("useMyHook", () => {
  it("should be able to sort data by number in ascending order", () => {
    const mockData = [
      { id: 1, name: "John" },
      { id: 3, name: "Jane" },
      { id: 2, name: "Bob" },
    ];

    const { result } = renderHook(() =>
      useSortable(mockData, {
        defaultSortKey: "id",
        defaultSortOrder: "asc",
      })
    );

    expect(result.current.sorted.map((el) => el.id)).toEqual([1, 2, 3]);
  });

  it("should be able to sort data by number in descending order", () => {
    const mockData = [
      { id: 1, name: "John" },
      { id: 3, name: "Jane" },
      { id: 2, name: "Bob" },
    ];

    const { result } = renderHook(() =>
      useSortable(mockData, {
        defaultSortKey: "id",
        defaultSortOrder: "desc",
      })
    );

    expect(result.current.sorted.map((el) => el.id)).toEqual([3, 2, 1]);
  });

  it("should be able to sort data by Date in descending order", () => {
    const mockData = [
      { id: 1, name: "John", createdAt: new Date("2020-01-01") },
      { id: 3, name: "Jane", createdAt: new Date("2020-01-03") },
      { id: 2, name: "Bob", createdAt: new Date("2020-01-02") },
    ];

    const { result } = renderHook(() =>
      useSortable(mockData, {
        defaultSortKey: "createdAt",
        defaultSortOrder: "desc",
      })
    );

    expect(result.current.sorted.map((el) => el.id)).toEqual([3, 2, 1]);
  });

  it("should be able to change sort order by setSortOrder", () => {
    const mockData = [
      { id: 1, name: "John", createdAt: new Date("2020-01-01") },
      { id: 3, name: "Jane", createdAt: new Date("2020-01-03") },
      { id: 2, name: "Bob", createdAt: new Date("2020-01-02") },
    ];

    const { result } = renderHook(() =>
      useSortable(mockData, {
        defaultSortKey: "createdAt",
        defaultSortOrder: "desc",
      })
    );

    expect(result.current.sorted.map((el) => el.id)).toEqual([3, 2, 1]);

    act(() => {
      result.current.setSortOrder("asc");
      jest.advanceTimersByTime(100);
    });

    expect(result.current.sorted.map((el) => el.id)).toEqual([1, 2, 3]);
  });

  it("should be able to change sort order by setSortKey with the same key", () => {
    const mockData = [
      { id: 1, name: "John", createdAt: new Date("2020-01-01") },
      { id: 3, name: "Jane", createdAt: new Date("2020-01-03") },
      { id: 2, name: "Bob", createdAt: new Date("2020-01-02") },
    ];

    const { result } = renderHook(() =>
      useSortable(mockData, {
        defaultSortKey: "createdAt",
        defaultSortOrder: "desc",
      })
    );

    expect(result.current.sorted.map((el) => el.id)).toEqual([3, 2, 1]);

    act(() => {
      result.current.setSortKey("createdAt");
      jest.advanceTimersByTime(100);
    });

    expect(result.current.sorted.map((el) => el.id)).toEqual([1, 2, 3]);
  });
});
