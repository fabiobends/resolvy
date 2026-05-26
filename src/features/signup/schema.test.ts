import { signupSchema } from "./schema";

describe("signupSchema", () => {
  it("accepts valid signup data", () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "secure123",
    };
    expect(() => signupSchema.parse(data)).not.toThrow();
  });

  it("rejects empty firstName", () => {
    const result = signupSchema.safeParse({
      firstName: "",
      lastName: "Doe",
      email: "john@example.com",
      password: "secure123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain("First name");
    }
  });

  it("rejects short firstName", () => {
    const result = signupSchema.safeParse({
      firstName: "J",
      lastName: "Doe",
      email: "john@example.com",
      password: "secure123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain("at least 2");
    }
  });

  it("rejects empty lastName", () => {
    const result = signupSchema.safeParse({
      firstName: "John",
      lastName: "",
      email: "john@example.com",
      password: "secure123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain("Last name");
    }
  });

  it("rejects invalid email", () => {
    const result = signupSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "not-an-email",
      password: "secure123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain("valid email");
    }
  });

  it("rejects empty password", () => {
    const result = signupSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain("Password is required");
    }
  });

  it("rejects short password", () => {
    const result = signupSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain("at least 6");
    }
  });

  it("rejects missing fields", () => {
    const result = signupSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  });
});
