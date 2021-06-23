const express = require("express");
var cors = require("cors");

const { ValidationError } = require("express-json-validator-middleware");
const endpointsRouter = require("./endpoints");

// Default port is 3001, but change it here if it's already in use
const PORT = 3001;

function validationErrorMiddleware(error, request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  const isValidationError = error instanceof ValidationError;
  if (!isValidationError) {
    return next(error);
  }

  response.status(400).json({
    errors: error.validationErrors,
  });

  next();
}

function catchAllErrorHandler(err, req, res) {
  res.status(500).send("error", { error: err });
}

function logErrorsHandler(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

const app = express();

app.use(cors());

app.use(express.json({ type: "application/json" }));

app.use(endpointsRouter);

app.use(validationErrorMiddleware);
app.use(logErrorsHandler);
app.use(catchAllErrorHandler);

const server = app.listen(PORT, function () {
  const port = server.address().port;

  console.log("minut-recipe-be listening at http://localhost:%s", port);
});
