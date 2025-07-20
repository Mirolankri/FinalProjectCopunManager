class DuplicatePhoneError extends Error {
    constructor(message) {
      super(message);
      this.name = 'DuplicatePhoneError';
      this.status = 409;
    }
}
module.exports = DuplicatePhoneError;