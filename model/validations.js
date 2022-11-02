const { isAlphanumeric, isURL, isEmail } = require("validator");

function urlSchema(opts = {}) {
  const { required } = opts;

  return {
    type: String,
    required: !!required,
    validate: {
      validator: isURL,
      message: (props) => `${props.value} is not a valid URL`,
    },
  };
}

function emailSchema(opts = {}) {
  const { required } = opts;

  return {
    type: String,
    required: !!required,
    validate: {
      validator: isEmail,
      message: (props) => `${props.value} is not a valid email`,
    },
  };
}

function usernameSchema() {
  return {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minLength: 3,
    maxLength: 16,
    validate: [
      {
        validator: isAlphanumeric,
        message: (props) => `${props.value} is not a valid username`,
      },
      {
        validator: (str) => !str.includes("admin"),
        message: (props) => `${props.value} is not a valid username`,
      },

      {
        validator: function (username) {
          return isUnique(this, username);
        },
        message: (props) => `${props.value} is already taken`,
      },
    ],
  };
}

async function isUnique(doc, username) {
  const user = await get(username);
  return !user || user._id.equals(doc._id);
}

module.exports = {
  urlSchema,
  emailSchema,
  usernameSchema,
};
