import { array, boolean, integer, oneOf, string } from "./helpers";

describe("helpers", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    vitest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = { ...OLD_ENV };
  });

  describe("string", () => {
    it("throws an error if the requested variable is missing", () => {
      expect(() => string("FOO")).toThrow();
    });

    it("returns a string if the requested variable is defined", () => {
      process.env.FOO = "foo";

      expect(string("FOO")).toBe("foo");
    });
  });

  describe("integer", () => {
    it("throws an error if the requested variable is missing", () => {
      expect(() => integer("FOO")).toThrow();
    });

    it("throws an error if the requested variable is not a valid integer", () => {
      process.env.FOO = "a123a";

      expect(() => integer("FOO")).toThrow();
    });

    it("returns a parsed number if the requested variable is a valid integer", () => {
      process.env.FOO = "123";

      expect(integer("FOO")).toBe(123);
    });
  });

  describe("oneOf", () => {
    it("throws an error if the requested variable is missing", () => {
      expect(() => oneOf("FOO", ["foo", "bar"])).toThrow();
    });

    it("throws an error if the requested variable is not one of the allowed values", () => {
      process.env.FOO = "baz";

      expect(() => oneOf("FOO", ["foo", "bar"])).toThrow();
    });

    it("returns a value if the requested variable is one of the allowed values", () => {
      process.env.FOO = "bar";

      expect(oneOf("FOO", ["foo", "bar"])).toBe("bar");
    });
  });

  describe("boolean", () => {
    it("throws an error if the requested variable is missing", () => {
      expect(() => boolean("FOO")).toThrow();
    });

    it("throws an error if the requested variable is not a valid boolean", () => {
      process.env.FOO = "trueeeeee";

      expect(() => boolean("FOO")).toThrow();
    });

    it("returns a value if the requested variable is a valid boolean", () => {
      process.env.FOO = "true";

      expect(boolean("FOO")).toBe(true);
    });
  });

  describe("array", () => {
    it("throws an error if the requested variable is missing", () => {
      expect(() => array("FOO")).toThrow();
    });

    it("returns an if the requested variable is a list of comma separated values", () => {
      process.env.FOO = "foo,bar,baz";

      expect(array("FOO")).toEqual(["foo", "bar", "baz"]);
    });
  });
});
