const request = require("supertest");
const app = require("../src/app");

describe("User API", () => {
  it("GET /api/users → should return all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("GET /api/users/:id → should return a single user", async () => {
    const res = await request(app).get("/api/users/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "Alice");
  });

  it("POST /api/users → should create a new user", async () => {
    const newUser = { name: "Charlie" };
    const res = await request(app).post("/api/users").send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", "Charlie");
  });

  it("GET /api/users/:id → invalid ID should return error", async () => {
    const res = await request(app).get("/api/users/999");
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "User not found");
  });
});
