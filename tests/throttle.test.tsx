import { throttle } from "../src/utils/throttle";
import { describe, it, expect } from "vitest";

// const mockAction = vi.fn(mute);

describe("throttle", () => {
  it("should NOT throttle when callCount is less than 10", () => {
    const params = {
      callCount: 0,
    };
    const result = throttle(params);
    expect(result).toBe(false);
  });
  it("should throttle when callCount is more than 10", () => {
    const params = {
      callCount: 11,
    };
    const result = throttle(params);
    expect(result).toBe(true);
  });
});
