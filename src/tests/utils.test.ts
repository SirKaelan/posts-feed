import { truncateText, capitalizeFirstLetter } from "../utils/utils";

test("truncates string when aspecified limit is reached and adds dots", () => {
  expect(truncateText("testing", 3)).toBe("tes...");
});

test("capitalizes first letter of string", () => {
  expect(capitalizeFirstLetter("test")).toBe("Test");
});
