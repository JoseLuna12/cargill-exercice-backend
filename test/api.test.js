const request = require("supertest");
const app = require("../app");

describe("Test the Farm REST API", () => {
    test("It should get all Farms", done => {
        request(app)
            .get("/api/getFarms")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test("It should get one Farm", done => {
        request(app)
            .get("/api/getFarm/5f86506b3929214d0011b790")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test("It should get the total size of the farm", done => {
        request(app)
            .get("/api/farmSize/5f86506b3929214d0011b790")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});

describe("Test the Pond REST API", () => {
    test("It should get all Ponds by Farm ID", done => {
        request(app)
            .get("/api/getPonds/5f86506b3929214d0011b790")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test("It should get one Pond", done => {
        request(app)
            .get("/api/getPond/5f868ffbc720d81adc296053")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});