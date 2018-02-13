let http = require('http');

module.exports = function (port) {
  let self = this;
  try {
    self.server = http.createServer(function (req, res) {
      res.statusCode = 404;
      res.end();
    });
  } catch (e) {
    throw Error('unable to create server');
  }
  return new Promise((resolve, reject) => {
    self.server.listen(port, null, null, function (err, result) {
      try {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    });
  });
};
