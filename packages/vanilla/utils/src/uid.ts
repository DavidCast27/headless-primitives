import { v4 as uuidv4 } from "uuid";

/**
 * Generates a unique ID with an optional prefix.
 */
export function uid(prefix = "hp") {
  return `${prefix}-${uuidv4()}`;
}
