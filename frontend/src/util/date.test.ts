import { describe, expect, it } from "vitest";
import { getDaysAgoFromISO } from "./date";

describe("getDaysAgoFromISO", () => {
    it("returns today if iso string within 24 hours", () => {
        // Setup test
        let now = new Date();
        let input = new Date(now.getTime() - 80000000); // 8000000 is less than 24 hours in milliseconds
        let expected = "today";

        // Execute test
        let actual = getDaysAgoFromISO(input.toISOString());
        expect(expected).toBe(actual);
    });
    it("returns yesterday if iso string between 24-48 hours", () => {
        // Setup test
        let now = new Date();
        let input = new Date(now.getTime() - 160000000); // 16000000 is between 24-48 hours in milliseconds
        let expected = "yesterday";

        // Execute test
        let actual = getDaysAgoFromISO(input.toISOString());
        expect(expected).toBe(actual);
    });
    it("returns 2 days ago if iso string between 48-72 hours", () => {
        // Setup test
        let now = new Date();
        let input = new Date(now.getTime() - 240000000); // 24000000 is between 48-72 hours in milliseconds
        let expected = "2d ago";

        // Execute test
        let actual = getDaysAgoFromISO(input.toISOString());
        expect(expected).toBe(actual);
    });
    it("returns 4 days ago if iso string between 48-72 hours", () => {
        // Setup test
        let now = new Date();
        let input = new Date(now.getTime() - 400000000); // 48000000 is between 4-5 days in milliseconds
        let expected = "4d ago";

        // Execute test
        let actual = getDaysAgoFromISO(input.toISOString());
        expect(expected).toBe(actual);
    });
});
