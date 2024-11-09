const bcrypt = require("bcrypt");

module.exports = (db) => {
  const users = db.collection("users");

  async function registerUser(username, email, password) {
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      throw new Error("Email already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await users.insertOne({ username, email, password: hashedPassword });
    return result.insertedId;
  }

  async function loginUser(email, password) {
    const user = await users.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      return 1;
    } else {
      return 0;
    }
  }

  return { registerUser, loginUser };
};
