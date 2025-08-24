# @se-oss/snowflake-sequence

[![CI](https://github.com/shahradelahi/snowflake-sequence/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/shahradelahi/snowflake-sequence/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/@se-oss/snowflake-sequence.svg)](https://www.npmjs.com/package/@se-oss/snowflake-sequence)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](/LICENSE)
[![Install Size](https://packagephobia.com/badge?p=@se-oss/snowflake-sequence)](https://packagephobia.com/result?p=@se-oss/snowflake-sequence)

A lightweight TypeScript library for generating and working with Snowflake IDs.

---

- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [API](#-api)
- [Contributing](#-contributing)
- [License](#license)

## ✨ Features

- ✅ **BigInt Support**: Natively handles 64-bit integers for precision and safety.
- ✅ **Customizable**: Configure node IDs and epochs to suit your distributed system's needs.
- ✅ **Deconstruction**: Easily extract timestamp, node ID, and sequence from any Snowflake ID.
- ✅ **Pure TypeScript**: Written entirely in TypeScript with zero dependencies.

## 📦 Installation

```bash
pnpm install @se-oss/snowflake-sequence
```

## 📖 Usage

```typescript
import { Snowflake } from '@se-oss/snowflake-sequence';

// Create a new Snowflake generator with a unique node ID.
const snowflake = new Snowflake({
  nodeId: 1,
  epoch: 1640995200000, // Optional: Jan 1, 2022
});

// Generate a new ID.
const id = snowflake.nextId();
console.log(id);
// => 173242904923537409n

// Deconstruct an ID to get its component parts.
const deconstructed = Snowflake.deconstruct(id);
console.log(deconstructed);
// {
//   timestamp: 1640995200000n,
//   nodeId: 1n,
//   sequence: 1n,
//   epoch: 1288834974657n // The default Twitter epoch
// }
```

## 📚 API

### `new Snowflake(options)`

Creates a new Snowflake generator instance.

- `options.nodeId` (`number`): A unique identifier for the node (0-1023). **Required**.
- `options.epoch` (`number`): A custom epoch timestamp in milliseconds. **Optional**. Defaults to the Twitter epoch (`1288834974657`).

### `snowflake.nextId()`

Generates a new Snowflake ID as a `bigint`.

### `Snowflake.deconstruct(id)`

A static method to deconstruct a Snowflake ID into its component parts.

- `id` (`bigint`): The Snowflake ID to deconstruct.

Returns an object with the following properties:

- `timestamp` (`bigint`)
- `nodeId` (`bigint`)
- `sequence` (`bigint`)
- `epoch` (`bigint`)

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](httpss://github.com/shahradelahi/snowflake-sequence)

Thanks again for your support, it is much appreciated! 🙏

## License

[MIT](/LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi) and [contributors](https://github.com/shahradelahi/snowflake-sequence/graphs/contributors).
