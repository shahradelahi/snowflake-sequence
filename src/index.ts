import {
  DEFAULT_EPOCH,
  MAX_NODE_ID,
  MAX_SEQUENCE,
  NODE_ID_SHIFT,
  TIMESTAMP_SHIFT,
} from '@/constants';
import type { DeconstructedSnowflake, SnowflakeOptions } from '@/typings';

export class Snowflake {
  readonly #nodeId: bigint;
  readonly #epoch: bigint;
  #sequence = 0n;
  #lastTimestamp = -1n;

  /**
   * Creates a new Snowflake generator.
   * @param options The options for the Snowflake generator.
   */
  constructor(options: SnowflakeOptions) {
    if (options.nodeId < 0 || options.nodeId > MAX_NODE_ID) {
      throw new Error(`Node ID must be between 0 and ${MAX_NODE_ID}`);
    }

    this.#nodeId = BigInt(options.nodeId);
    this.#epoch = BigInt(options.epoch ?? DEFAULT_EPOCH);
  }

  /**
   * Generates a new Snowflake ID.
   * @returns A new Snowflake ID as a bigint.
   */
  public nextId(): bigint {
    let timestamp = this.#timestamp();

    if (timestamp < this.#lastTimestamp) {
      throw new Error('Clock moved backwards. Refusing to generate ID.');
    }

    if (timestamp === this.#lastTimestamp) {
      this.#sequence = (this.#sequence + 1n) & MAX_SEQUENCE;
      if (this.#sequence === 0n) {
        timestamp = this.#tilNextMillis(this.#lastTimestamp);
      }
    } else {
      this.#sequence = 0n;
    }

    this.#lastTimestamp = timestamp;

    return (
      ((timestamp - this.#epoch) << TIMESTAMP_SHIFT) |
      (this.#nodeId << NODE_ID_SHIFT) |
      this.#sequence
    );
  }

  /**
   * Deconstructs a Snowflake ID into its components.
   * @param id The Snowflake ID to deconstruct.
   * @returns The deconstructed components of the Snowflake ID.
   */
  public static deconstruct(id: bigint): DeconstructedSnowflake {
    const timestamp = (id >> TIMESTAMP_SHIFT) + BigInt(DEFAULT_EPOCH);
    const nodeId = (id >> NODE_ID_SHIFT) & MAX_NODE_ID;
    const sequence = id & MAX_SEQUENCE;

    return {
      timestamp,
      nodeId,
      sequence,
      epoch: BigInt(DEFAULT_EPOCH),
    };
  }

  #timestamp(): bigint {
    return BigInt(Date.now());
  }

  #tilNextMillis(lastTimestamp: bigint): bigint {
    let timestamp = this.#timestamp();
    while (timestamp <= lastTimestamp) {
      timestamp = this.#timestamp();
    }
    return timestamp;
  }
}

export type { DeconstructedSnowflake, SnowflakeOptions };
