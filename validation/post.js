const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.avatar = !isEmpty(data.avatar) ? data.avatar : "";

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text is required";
  }

  if (!Validator.isLength(data.text, { min: 10, max: 380 })) {
    errors.text = "Text length should between 10 to 380 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (Validator.isEmpty(data.avatar)) {
    errors.avatar = "Avatar field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
