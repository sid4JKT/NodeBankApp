<<<<<<< HEAD
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

chai.should();

chai.use(chaiHttp);

describe("Task API", () => {

    beforeEach(function () {
        console.log("before")
        })


  describe("GET /player", () => {


    it("It should get all the task", (done) => {
      chai
        .request("http://localhost:8080")
        .get("/player")
        .end(async (err, res) => {
          await res.should.have.status(200);
          done();
        });
    });

    it("It should create TXN for Deposite", (done) => {
        const Accountdepositejson={
            "acctnum":10001,
            "txndetail":"withdraw",
            "withdrawamount":0,
            "depositamount":2000
        
        }
        chai
          .request("http://localhost:8080")
          .post("/Accountdeposite")
          .send(Accountdepositejson)
          .end(async (err, res) => {
            await res.should.have.status(200);
            // res.body.should.be.a('array');
            // res.body.length.should.be.eq(2)
            done();
          });
    });

    it("It should create TXN for Withdraw", (done) => {
        const Accountdepositejson={
            "acctnum":10001,
            "txndetail":"withdraw",
            "withdrawamount":1000,
            "depositamount":0
        
        }
        chai
          .request("http://localhost:8080")
          .post("/Accountwithdraw")
          .send(Accountdepositejson)
          .end(async (err, res) => {
            await res.should.have.status(200);
            // res.body.should.be.a('array');
            // res.body.length.should.be.eq(2)
            done();
          });
    });

  });
});

=======
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

chai.should();

chai.use(chaiHttp);

describe("Task API", () => {

    beforeEach(function () {
        console.log("before")
        })


  describe("GET /player", () => {


    it("It should get all the task", (done) => {
      chai
        .request("http://localhost:8080")
        .get("/player")
        .end(async (err, res) => {
          await res.should.have.status(200);
          done();
        });
    });

    it("It should create TXN for Deposite", (done) => {
        const Accountdepositejson={
            "acctnum":10001,
            "txndetail":"withdraw",
            "withdrawamount":0,
            "depositamount":2000
        
        }
        chai
          .request("http://localhost:8080")
          .post("/Accountdeposite")
          .send(Accountdepositejson)
          .end(async (err, res) => {
            await res.should.have.status(200);
            // res.body.should.be.a('array');
            // res.body.length.should.be.eq(2)
            done();
          });
    });

    it("It should create TXN for Withdraw", (done) => {
        const Accountdepositejson={
            "acctnum":10001,
            "txndetail":"withdraw",
            "withdrawamount":1000,
            "depositamount":0
        
        }
        chai
          .request("http://localhost:8080")
          .post("/Accountwithdraw")
          .send(Accountdepositejson)
          .end(async (err, res) => {
            await res.should.have.status(200);
            // res.body.should.be.a('array');
            // res.body.length.should.be.eq(2)
            done();
          });
    });

  });
});

>>>>>>> 4245e5ca8949567eebfb153fca4dd0a367009d09
