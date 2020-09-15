exports.success = (req, res, message = '', status = 200) => 
    res.status(status).send({
        error: false,
        status: status,
        body: message,
    });


exports.error = function (req, res, message, status) {
  let statusCode = status || 500;
  let statusMessage = message || "Internal server error";

  res.status(statusCode).send({
    error: false,
    status: status,
    body: message,
  });
};