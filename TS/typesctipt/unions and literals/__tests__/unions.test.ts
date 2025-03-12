// Function to test
function getUsername(username: string | null): string {
  return username !== null ? `User: ${username}` : "Guest";
}

// Jest test suite
describe("getUsername function", () => {
  test("returns username with 'User: ' prefix when given a string", () => {
    expect(getUsername("Alice")).toBe("User: Alice");
  });

  test("returns 'Guest' when given null", () => {
    expect(getUsername(null)).toBe("Guest");
  });
});