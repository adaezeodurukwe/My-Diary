const request = require("request");
const server = require("../server_files/index")

const endpoint = 'http://localhost:5000/api/v1/entries'

describe('entries', () => {
    it('should return 200 response code', function (done) {
        request.get(endpoint, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
});