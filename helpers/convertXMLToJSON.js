let toJSON = require('xmljson').to_json;
module.exports = function (xml) {
  return new Promise(function (resolve, reject) {
    try {
      toJSON(xml, function (err, result) {
        if (err) {
          resolve(err);
        } else if (result) {
          resolve(result);
        } else {
          reject(Error('unable to parse xml'));
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};
