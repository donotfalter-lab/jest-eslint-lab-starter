const { capitalizeWords, filterActiveUsers, logAction } = require('../index')


// ==========================================================
// capitalizeWords
// ==========================================================
describe("capitalizeWords", () => {
  // Normal cases
  test("capitalizes each word in a normal sentence", () => {
    expect(capitalizeWords("hello world")).toBe("Hello World");
  });

  test("capitalizes a sentence with multiple words", () => {
    expect(capitalizeWords("the quick brown fox")).toBe("The Quick Brown Fox");
  });

  test("does not change a word that is already capitalized", () => {
    expect(capitalizeWords("Hello")).toBe("Hello");
  });

  // Edge case: empty string
  test("returns an empty string when given an empty string", () => {
    expect(capitalizeWords("")).toBe("");
  });

  // Edge case: special characters
  test("capitalizes both sides of a hyphenated word", () => {
    expect(capitalizeWords("hello-world")).toBe("Hello-World");
  });

  test("keeps punctuation like commas and exclamation marks", () => {
    expect(capitalizeWords("hello, world!")).toBe("Hello, World!");
  });

  // Edge case: single-word strings
  test("capitalizes a single lowercase word", () => {
    expect(capitalizeWords("hello")).toBe("Hello");
  });

  test("leaves a single already-capitalized word unchanged", () => {
    expect(capitalizeWords("Word")).toBe("Word");
  });
});

// ==========================================================
// filterActiveUsers
// ==========================================================
describe("filterActiveUsers", () => {
  test("returns only the active users from a mixed array", () => {
    const users = [
      { name: "Alice", isActive: true },
      { name: "Bob", isActive: false },
      { name: "Carol", isActive: true },
    ];

    const result = filterActiveUsers(users);

    expect(result).toEqual([
      { name: "Alice", isActive: true },
      { name: "Carol", isActive: true },
    ]);
  });

  test("returns an empty array when all users are inactive", () => {
    const users = [
      { name: "Alice", isActive: false },
      { name: "Bob", isActive: false },
    ];

    const result = filterActiveUsers(users);
    expect(result).toEqual([]);
  });

  test("returns an empty array when given an empty array", () => {
    const users = [];
    const result = filterActiveUsers(users);
    expect(result).toEqual([]);
  });
});

// ==========================================================
// logAction
// ==========================================================
describe("logAction", () => {
  test("generates the correct log string for valid inputs", () => {
    const result = logAction("login", "Alice");
    expect(result).toMatch(/^User Alice performed login at .+$/);
  });

  test("generates the correct log string for a different action and user", () => {
    const result = logAction("logout", "Bob");
    expect(result).toMatch(/^User Bob performed logout at .+$/);
  });

  // Edge case: missing action or username
  test("includes the word 'undefined' when action is missing", () => {
    const result = logAction(undefined, "Alice");
    expect(result).toMatch(/^User Alice performed undefined at .+$/);
  });

  test("includes the word 'undefined' when username is missing", () => {
    const result = logAction("login", undefined);
    expect(result).toMatch(/^User undefined performed login at .+$/);
  });

  // Edge case: empty strings as inputs
  test("handles an empty string as action", () => {
    const result = logAction("", "Alice");
    // Note the double space where the empty action leaves a gap.
    expect(result).toMatch(/^User Alice performed {2}at .+$/);
  });

  test("handles an empty string as username", () => {
    const result = logAction("login", "");
    expect(result).toMatch(/^User {2}performed login at .+$/);
  });
});
