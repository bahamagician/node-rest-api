exports.productionErrors = function(err, req, res, next) {
  res.status(500).send("Something blew up");
};

exports.developmentErrors = (err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.json({
    err: {
      status: err.status,
      message: err.message,
      description: err.stack.split("\n")
    }
  });
};
