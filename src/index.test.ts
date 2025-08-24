import { describe, expect, test, vi } from 'vitest';

import { Snowflake } from './index';

describe('Snowflake', () => {
  test('should generate unique, sortable IDs', () => {
    const snowflake = new Snowflake({ nodeId: 1 });
    const ids = Array.from({ length: 1000 }, () => snowflake.nextId());

    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);

    const sortedIds = [...ids].sort((a, b) => (a < b ? -1 : 1));
    expect(ids).toEqual(sortedIds);
  });

  test('should deconstruct an ID correctly', () => {
    const nodeId = 123;
    const snowflake = new Snowflake({ nodeId });
    const id = snowflake.nextId();

    const deconstructed = Snowflake.deconstruct(id);

    expect(deconstructed.nodeId).toBe(BigInt(nodeId));
    expect(deconstructed.sequence).toBe(0n);
    expect(deconstructed.timestamp).toBeGreaterThan(0n);
  });

  test('should throw an error for invalid node ID', () => {
    expect(() => new Snowflake({ nodeId: -1 })).toThrow();
    expect(() => new Snowflake({ nodeId: 1024 })).toThrow();
  });

  test('should handle sequence rollover', () => {
    const snowflake = new Snowflake({ nodeId: 1 });

    let lastTimestamp = 0n;
    let lastSequence = -1n;

    for (let i = 0; i < 5000; i++) {
      const id = snowflake.nextId();
      const { timestamp, sequence } = Snowflake.deconstruct(id);

      if (lastTimestamp === timestamp) {
        expect(sequence).toBe(lastSequence + 1n);
      } else {
        expect(sequence).toBe(0n);
      }

      lastTimestamp = timestamp;
      lastSequence = sequence;
    }
  });

  test('should throw an error if clock moves backwards', () => {
    const snowflake = new Snowflake({ nodeId: 1 });
    snowflake.nextId();

    const futureTime = Date.now() + 1000;
    vi.spyOn(Date, 'now').mockReturnValue(futureTime);
    snowflake.nextId();

    const pastTime = Date.now() - 1000;
    vi.spyOn(Date, 'now').mockReturnValue(pastTime);

    expect(() => snowflake.nextId()).toThrow('Clock moved backwards. Refusing to generate ID.');
  });
});
