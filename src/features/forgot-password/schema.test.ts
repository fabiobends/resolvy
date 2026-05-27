import { forgotPasswordSchema } from "./schema";

describe("forgotPasswordSchema", () => {
  it("accepts valid email", () => {
    expect(() =>
      forgotPasswordSchema.parse({ email: "john@example.com" }),
    ).not.toThrow();
  });

  it("rejects invalid email", () => {
    const result = forgotPasswordSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain("valid email");
    }
  });

  it("rejects empty email", () => {
    const result = forgotPasswordSchema.safeParse({ email: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain("valid email");
    }
  });

  it("rejects missing fields", () => {
    const result = forgotPasswordSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  });
});
