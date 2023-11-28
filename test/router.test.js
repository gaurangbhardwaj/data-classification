const app = require("../index.js");
const request = require("supertest");
const { expect } = require("chai");
const { stringConstants } = require("../app/common/constants.js");

describe("Routes", function () {
  it("responds to /", async () => {
    const res = await request(app).get("/");
    expect(res.text).equals(stringConstants.SERVICE_STATUS_HTML);
  });

  it("responds to /get-logs", async () => {
    const res = await request(app).get("/get-logs");
    const data = JSON.parse(res.text);
    expect(data.responseData).to.be.an("array");
    expect(data.responseData[0]).exist;
    expect(data.responseData[0].logsList).exist;
    expect(data.responseData[0].logsList).to.be.an("array");
  });
});
