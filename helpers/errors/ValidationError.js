const ApplicationError = require('./ApplicationError');
class ValidationError extends ApplicationError {
  constructor(message) {
    super(message || 'Form fields are invalid', 400);
  }
}
module.exports = ValidationError;