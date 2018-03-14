const process = require("./process.js");
exports.order = function order(req, res, next) {

  console.log("\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
  console.log(req.body);
  if (!is_request_valid(req.body)) {
    console.log('INVALID');
    res.status(400).end();
  } else {
    process.order(req.body, (error, total)=>{
      res.json( {total });
    })
  }
}

function is_request_valid(body) {
  return body.prices !== undefined &&
    body.quantities !== undefined &&
    Array.isArray(body.prices) &&
    Array.isArray(body.quantities) &&
    body.country !== undefined &&
    body.reduction !== undefined &&
    body.prices.length === body.quantities.length;
}

exports.feedback = function feedback(req, res, next) {
  console.info("FEEDBACK:", req.body.type, req.body.content);
  next();
}
