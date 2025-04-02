const request = require("supertest");
const app = require("../../../index");

describe("Login API", () => {
//   beforeAll(async () => {
//     await sequelize.sync({ force: true });
//     await User.create({
//       name: "User Two",
//       email: "user_two@gmail.com",
//       password: await bcrypt.hash("u123", 10),
//       role_type: "a", // Updated to match received data
//     });
//   });

//   afterAll(async () => {
//     await sequelize.close();
//   });

  test("POST /api/login with valid credentials should return a token", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: "user_two@gmail.com", password: "u123" })
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("result.access_token"); // Updated to match nested structure
    expect(response.body).toMatchObject({
      status: 200,
      message: "Logged in successfully",
      result: {
        user_id: expect.any(Number),
        access_token: expect.any(String),
        token_type: "Bearer",
        role_type: "a",
        expires_at: expect.any(String),
      },
    });
  });

  test("POST /api/login with invalid email should return 401", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: "wrong@gmail.com", password: "u123" })
      .set("Accept", "application/json");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: 401,
      message: "Authentication failed. User not found.",
    });
  });

  test("POST /api/login with invalid password should return 401", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: "user_two@gmail.com", password: "wrongpassword" })
      .set("Accept", "application/json");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: 401,
      message: "Authentication failed. Wrong password.",
    });
  });

  test("POST /api/login with missing fields should return 400", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: "user_two@gmail.com" }) // Missing password
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: 400,
      message: "Email and password are required",
    });
  });
});