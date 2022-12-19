const request = require("supertest");

const app = require("../routes/imagesRoute");

describe("GET /images", () => {
  it("respond with json containing a list of all images", (done) => {
    request(app)
      .get("/images")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("GET /images/:imageId", () => {
  it("respond with json containing a single image", (done) => {
    request(app)
      .get("/images/:imageId")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /images", () => {
  it("respond with json containing a single image", (done) => {
    request(app)
      .post("/images")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("DELETE /images/:imageId", () => {
  it("respond with json containing a single image", (done) => {
    request(app)
      .delete("/images/:imageId")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("PUT /images/:imageId", () => {
  it("respond with json containing a single image", (done) => {
    request(app)
      .put("/images/:imageId")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
