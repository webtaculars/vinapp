var request = require('request');

exports.getBasicInfo = function(req, res){
	console.log('http://www.decodethis.com/vin/' + req.params.vin + '.json');
  request.get( 
    { uri: 'http://www.decodethis.com/vin/' + req.params.vin + '.json',
     json: true,
      headers: {
        'Content-Type' : 'application/json',
    	}
    },
    function callback(error, response, object) {
      if (error) { return; }

      if (res.statusCode != 200 ) {
        return ;
      }
      res.json({body: object});
    }
  );
}