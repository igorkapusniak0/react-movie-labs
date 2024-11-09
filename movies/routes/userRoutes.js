const express = require("express");
const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  is_admin: Joi.boolean().optional(),
});

module.exports = (db) => {
  const { registerUser, loginUser } = require("../controller/userController.js")(db);

  const router = express.Router();

  router.post("/register", async (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    try {
      const userId = await registerUser(req.body.username, req.body.email, req.body.password);
      res.status(201).send({ userId });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const userId = await loginUser(email, password);
      if (userId) {
        res.status(200).send({ userId });
      } else {
        res.status(401).send({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  return router;
};
