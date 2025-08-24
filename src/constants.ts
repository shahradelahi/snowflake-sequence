/**
 * The default epoch timestamp used by Twitter Snowflake.
 * (November 4, 2010, 01:42:54 UTC)
 */
export const DEFAULT_EPOCH = 1288834974657;

export const NODE_ID_BITS = 10n;
export const SEQUENCE_BITS = 12n;

export const MAX_NODE_ID = -1n ^ (-1n << NODE_ID_BITS);
export const MAX_SEQUENCE = -1n ^ (-1n << SEQUENCE_BITS);

export const NODE_ID_SHIFT = SEQUENCE_BITS;
export const TIMESTAMP_SHIFT = NODE_ID_BITS + SEQUENCE_BITS;
