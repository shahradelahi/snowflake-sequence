import { bench, describe } from 'vitest';

import { Snowflake } from './index';

describe('Snowflake Benchmarks', () => {
  const snowflake = new Snowflake({ nodeId: 1 });
  const id = snowflake.nextId();

  bench('snowflake.nextId()', () => {
    snowflake.nextId();
  });

  bench('Snowflake.deconstruct()', () => {
    Snowflake.deconstruct(id);
  });
});
