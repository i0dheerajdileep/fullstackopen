// Import required modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");

// Import helper functions and the app module
const helper = require("./test_helper");
const app = require("../app");

// Create a test client using supertest and the app module
const api = supertest(app);

// Set up the test environment before each test
beforeEach(async () => {
  // Delete all users from the database
  await helper.clearUsers();

  // Insert initial users from the test_helper module
  await helper.insertInitialUsers();
});

// Test suite for when there is initially one user saved
describe("when there is initially one user saved", () => {
  // Test that the user is returned correctly
  test("user is returned", async () => {
    // Get the initial users from the database
    const usersAtStart = await helper.getUsers();

    // Make an assertion on the first user's username
    expect(usersAtStart[0].username).toBe("hellas");
  });

  // Test that creation fails if the username is missing
  test("creation fails if username is missing", async () => {
    const usersAtStart = await helper.getUsers();

    const newUser = {
      name: "name",
      password: "password",
    };

    // Send a POST request to create a new user without a username
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    // Make an assertion on the error message
    expect(result.body.error).toContain("username and password are required");

    // Check that the number of users remains the same
    const usersAtEnd = await helper.getUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  // Test that creation fails if the password is missing
  test("creation fails if password is missing", async () => {
    const usersAtStart = await helper.getUsers();

    const newUser = {
      username: "root",
      name: "name",
    };

    // Send a POST request to create a new user without a password
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    // Make an assertion on the error message
    expect(result.body.error).toContain("username and password are required");

    // Check that the number of users remains the same
    const usersAtEnd = await helper.getUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  // Test that creation fails if the username is shorter than 3 characters
  test("creation fails if username is shorter than 3 characters", async () => {
    const usersAtStart = await helper.getUsers();

    const newUser = {
      username: "aa",
      name: "name",
      password: "password",
    };

    // Send a POST request to create a new user with a short username
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    // Make an assertion on the error message
    expect(result.body.error).toContain(
      "username and password must be at least 3 characters long"
    );

    // Check that the number of users remains the same
    const usersAtEnd = await helper.getUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  // Test that creation fails if the password is shorter than 3 characters
  test("creation fails if password is shorter than 3 characters", async () => {
    const usersAtStart = await helper.getUsers();

    const newUser = {
      username: "aaasdsad",
      name: "name",
      password: "pa",
    };

    // Send a POST request to create a new user with a short password
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    // Make an assertion on the error message
    expect(result.body.error).toContain(
      "username and password must be at least 3 characters long"
    );

    // Check that the number of users remains the same
    const usersAtEnd = await helper.getUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});


afterAll(() => {
    mongoose.connection.close();
  });