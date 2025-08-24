export interface SnowflakeOptions {
  /**
   * A unique identifier for the node generating the IDs.
   * Must be between 0 and 1023.
   */
  nodeId: number;

  /**
   * The custom epoch timestamp in milliseconds.
   * Defaults to the Twitter epoch.
   */
  epoch?: number;
}

export interface DeconstructedSnowflake {
  /** The timestamp portion of the Snowflake ID. */
  timestamp: bigint;
  /** The node ID portion of the Snowflake ID. */
  nodeId: bigint;
  /** The sequence portion of the Snowflake ID. */
  sequence: bigint;
  /** The epoch used to generate the Snowflake ID. */
  epoch: bigint;
}
