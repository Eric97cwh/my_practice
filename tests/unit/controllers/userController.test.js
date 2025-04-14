import request from "supertest";
import app from "../../../index";

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

// describe('GET /api/users/list', () => {
  // beforeAll(async () => {
  //   await sequelize.sync({ force: true });
  // });

  // afterEach(async () => {
  //   await User.destroy({ truncate: true });
  // });

  // afterAll(async () => {
  //   await sequelize.close();
  // });

//   describe('when database has users', () => {
//     beforeEach(async () => {
//       await User.bulkCreate([
//         { name: 'User1', email: 'user_one@gmail.com' },
//         { name: 'User2', email: 'user_two@gmail.com' }
//       ]);
//     });

//     test('should return 200 status with users array', async () => {
//       const response = await request(app)
//         .get('/api/users/list')
//         .expect(200);

//       // More flexible assertion
//       expect(response.body.status).toBe(200);
//       expect(response.body.message).toBe('Users listed successfully');
//       expect(Array.isArray(response.body.result)).toBe(true);
//       expect(response.body.result.length).toBe(2);
      
//       // Verify first user structure without exact values
//       expect(response.body.result[0]).toEqual({
//         id: expect.any(Number),
//         name: expect.any(String),
//         email: expect.any(String),
//         created_at: expect.any(String),
//         updated_at: expect.any(String)
//       });
//     });
//   });

//   describe('when database is empty', () => {
//     test('should return 200 status with empty array', async () => {
//       const response = await request(app)
//         .get('/api/users/list')
//         .expect(200);

//       expect(response.body).toEqual({
//         status: 200,
//         message: 'No users found',
//         result: []
//       });
//     });
//   });
// });