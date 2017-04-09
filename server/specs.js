var app = require('./server.js'),
    chai = require('chai'),
    http = require('chai-http'),
    sequelize = require('sequelize'),
    tcnModel = require('../biodata/tcnmodel.js'),
    request = require('supertest'),
    expect = chai.expect,
    assert = chai.assert,
    should = chai.should();

    chai.use(http);


    describe('USERS', function() { 

            // tcnModel.destroy();
        //   beforeEach(function(done){
        //     Todomodel.collection.drop();
        //     done();
        // });

        var item = {
            "firstName" : "ola",
            "lastName" : "mide"
        };

        var upd = {
            "firstName" : "tolu",
            "lastName" : "seamless"
        };

        var dnd = {
            "firstName" : "od",
            "lastName" : "era"
        };

        var dada = {
            "firstName" : "baba",
            "lastName" : "tunde"
        };

       

        it("it should fail if there are no users", function(done) {
            request(app)
                .get('/users')
                .expect(501)
                .expect("Content-Type", "application/json")
                .end(function(err, res){
                        expect(res.body).to.be.an("array");
                        done();

                });
        })

        it("should add a task to the todo database", function(done) {
            chai.request(app)
                .post('/users')
                .send(upd)
                .end(function(err, res) {
                    res.should.have.status(200);
                    should.not.exist(err);
                    res.body.should.be.an("Object");
                    done();
            });
        });

    	it("should get all tasks", function(done) {
    		request(app)
		    	.get('/users')
		    	.expect(200)
		    	.expect("Content-Type", "application/json")
		    	.end(function(err, res){
		    			expect(res.body).to.be.a('array');
		    			done();

		    	});
    	})

        

        it("should get a task by id", function(done) {
            request(app)
                .post("/users")
                .send(upd)
                .end(function(err, res) {
                    var item_id = res.body.id;
                    request(app)
                        .get("/users/" + item_id)
                        .expect(200)
                        .expect("Content-type", "application/json")
                        .end(function(err, res){
                            expect(res.body).to.be.an('object');
                            res.body.should.be.an("Object");
                            
                            done();
                        });
                });
        });

        it("should update a task by id", function(done) {
            request(app)
                .post("/users")
                .send(dada)
                .end(function(err, res){
                    var taska = res.body.firstName;
                    var item2_id = res.body.id;
                    request(app)
                        .put("/users/" + item2_id)
                        .send(dnd)
                        .end(function(err, res) {
                            res.status.should.equal(200);
                            var ntask = res.body.firstName;
                            should.not.exist(err);
                            res.body.should.be.an("Object");
                            done();

                        });
                });
        });

        it("should delete a task by id", function(done) {
            request(app)
                .post('/users')
                .send(upd)
                .end(function(err, res){
                    var spark = res.body.firstName;
                    var spark_id = res.body.id;
                    request(app)
                    .delete('/users/' + spark_id)
                    .end(function(error, response){
                        var del = response.body.id;
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.be.an('object');
                        response.body.should.have.property('id');
                        done();
                    })

                })
        })

        
    });