const request = require("supertest");

const app = require("../routes/auth");

// test registration
describe("POST /auth/register", () => {
  it("respond with json containing a single user", (done) => {
    request(app)
      .post("/auth/register")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// test login
describe("POST /auth/login", () => {
  it("respond with json containing a single user", (done) => {
    request(app)
      .post("/auth/login")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// test password reset
describe("POST /auth/pwd-reset", () => {
  it("respond with json containing a single user", (done) => {
    request(app)
      .post("/auth/pwd-reset")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
