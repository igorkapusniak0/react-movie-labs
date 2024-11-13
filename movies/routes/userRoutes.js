const express = require("express");
const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  is_admin: Joi.boolean().optional(),
});

module.exports = (db) => {
  const { registerUser, loginUser, setMoviePlaylist, setShowPlaylist, getMoviePlaylist, getShowPlaylist } = require("../controller/userController.js")(db);

  const router = express.Router();

  router.post("/register", async (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    try {
      const userId = await registerUser(req.body.username, req.body.email, req.body.password);
      console.log("data",req.body.email, req.body.password)
      const loginStatus = await loginUser(req.body.email, req.body.password);

      res.status(201).send({ loginStatus });
      console.log(loginStatus);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const loginStatus = await loginUser(email, password);
      if (loginStatus) {
        res.status(200).send({ loginStatus });
      } else {
        res.status(401).send({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  router.put("/setShowPlaylist", async (req, res) => {
    console.log('Received payload:', req.body);
    const { email, showPlaylist } = req.body;
    try {
      const setData = await setShowPlaylist(email, showPlaylist);
      console.log("setData",setData)
      if (setData) {
        res.status(200).send({ setData });
      } else {
        res.status(401).send({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  router.put("/setMoviePlaylist", async (req, res) => {
    const { email, moviePlaylist } = req.body;
    try {
      const setData = await setMoviePlaylist(email, moviePlaylist);
      if (setData) {
        res.status(200).send({ setData });
      } else {
        res.status(401).send({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  router.post("/getMoviePlaylist", async (req, res) => {
    const { email } = req.body;
    try {
      const data = await getMoviePlaylist(email);
      if (data) {
        res.status(200).send({ data });
      } else {
        res.status(401).send({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

router.post("/getShowPlaylist", async (req, res) => {
  const { email } = req.body;
  try {
    const data = await getShowPlaylist(email);
    if (data) {
      res.status(200).send({ data });
    } else {
      res.status(401).send({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

return router;
};
