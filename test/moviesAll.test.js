const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../app');

chai.use(chaiHttp);

let token;

describe('/api/movies/all', () => {
    before((done) => {
        chai.request(server).post('/auth')
            .send({ username: 'test', password: 'test' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.headers["content-type"].should.contains('application/json');
                token = res.body.token;
                //console.log(token);
                done();
            });
    });

    it('this should gather all movies', (done) => {
        chai.request(server).get('/api/movies/all')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.headers["content-type"].should.contains('application/json');
                done();
            })
    });

})