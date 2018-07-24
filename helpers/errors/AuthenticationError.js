const ApplicationError = require('./ApplicationError');
class AuthenticationError extends ApplicationError {
  constructor(message) {
    super(message || 'Incorrect Username & Password Combination', 401);
  }
}
module.exports = AuthenticationError;