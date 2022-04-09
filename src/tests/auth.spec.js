const request = require("supertest");
const app = require("../app");

// Test suite
describe("Test user signup", () => {
    // POST /users
    it("Should fail with 400 when I send an empty body", () => {
        request(app)
            .post("/users")
            .send()
            .set("Accept", "application/json")
            .expect(400);
    });

    it("Should fail with 400 when I send a body without a name", () => {
        request(app)
            .post("/users")
            .send({
                email: "a@gmail.com",
                phoneNumber: "01234567890",
                password: "1244",
            })
            .set("Accept", "application/json")
            .expect(400);
    });

    it("Should signup the user", (done) => {
        const user = {
            name: "Ali",
            email: "ali@gmail.com",
            phoneNumber: "0123456789",
            password: "12444",
        };

        request(app)
            .post("/users")
            .send(user)
            .set("Accept", "application/json")
            .expect(200)
            .then((res) => {
                console.log("res", res.body);
                expect(res.body.email).toBe(user.email);
                expect(res.body.name).toBe(user.name);
                expect(res.body.phoneNumber).toBe(user.phoneNumber);
                done();
            })
            .catch((e) => done(e));
    });
});
