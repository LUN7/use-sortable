# use-sortable

> A simple react hook to help you sort the data for table view and list view

[![NPM](https://img.shields.io/npm/v/@lun7/use-sortable.svg)](https://www.npmjs.com/package/@lun7/use-sortable) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-sortable
```

or

```bash
yarn add use-sortable
```

## Usage

### Basic

```tsx
import * as React from "react";

import { useSortable } from "use-sortable";

const sampleData = [
  { name: "John", age: 20 },
  { name: "Jane", age: 21 },
  { name: "Jack", age: 22 },
];

const ExampleA = () => {
  // sort the data by name in ascending order
  const { sorted, setSortKey } = useSortable(sampleData, {
    defaultSortKey: "name",
    defaultSortOrder: "asc",
  });
  return <div>{example}</div>;
};

const ExampleB = () => {
  // sort the data by name in descending order
  const { sorted, setSortKey } = useSortable(sampleData, "name", {
    defaultSortKey: "name",
    defaultSortOrder: "desc",
  });
  return <div>{example}</div>;
};
```

### Changing the sort key

```tsx
import * as React from "react";

import { useSortable } from "use-sortable";

const sampleData = [
  { name: "John", age: 20 },
  { name: "Jane", age: 21 },
  { name: "Jack", age: 22 },
];

const Example = () => {
  const { sorted, setSortKey } = useSortable(sampleData, {
    defaultSortKey: "name",
    defaultSortOrder: "asc",
  });

  const handleSort = (key: string) => {
    setSortKey(key);
  };

  return <Table data={sorted} onHeaderClicked={handleSort} />;
};
```

### More

Please check the [example](https://github.com/LUN7/use-sortable/example) and [docs] for more details.

## Q&A

### How to change sort direction

You can change the sort direction by invoking setSortKey again with the same key.

## License

MIT © [LUN7](https://github.com/LUN7)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
