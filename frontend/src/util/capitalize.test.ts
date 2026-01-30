import { describe, expect, it } from "vitest";
import { capitalize } from "./capitalize";

describe("capitalize", () => {
    it("returns capitalized string when given lowercase string", () => {
        let expected = "Hello";
        let actual = capitalize("hello");
        expect(expected).toBe(actual);
    });
    it("returns capitalized character when given lowercase character", () => {
        let expected = "A";
        let actual = capitalize("a");
        expect(expected).toBe(actual);
    });
    it("returns capitalized string when given already capitalized string", () => {
        let expected = "Hello";
        let actual = capitalize("Hello");
        expect(expected).toBe(actual);
    });
    it("returns capitalized character when given already capitalized character", () => {
        let expected = "A";
        let actual = capitalize("A");
        expect(expected).toBe(actual);
    });
    it("returns empty string when given empty string", () => {
        let expected = "";
        let actual = capitalize("");
        expect(expected).toBe(actual);
    });
    it("returns integer when given integer (stringified)", () => {
        let expected = "1";
        let actual = capitalize("1");
        expect(expected).toBe(actual);
    });
    it("returns 2 digit integer when given 2 digit integer (stringified)", () => {
        let expected = "12";
        let actual = capitalize("12");
        expect(expected).toBe(actual);
    });
    it("returns uppercase string when given uppercase string", () => {
        let expected = "HELLO";
        let actual = capitalize("HELLO");
        expect(expected).toBe(actual);
    });
    it("returns emoji when given emoji", () => {
        let expected = "✅";
        let actual = capitalize("✅");
        expect(expected).toBe(actual);
    });
    it("returns newline character when given newline character", () => {
        let expected = "\n";
        let actual = capitalize("\n");
        expect(expected).toBe(actual);
    });
    it("returns empty space when given empty space", () => {
        let expected = " ";
        let actual = capitalize(" ");
        expect(expected).toBe(actual);
    });
});
