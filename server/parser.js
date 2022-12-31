const express = require("express");
const router = express.Router();
const parser_utils = require("./utils/parser_utils");
const NodeCache = require('node-cache');
const myCache = new NodeCache();

router.get("/getCount", async (req, res, next) => {
    try {
      const results = await parser_utils.getCount(req.query.adsTxtUrl);
      res.send(results);
    } catch (error) {
      return next(error);
    }
  });

  module.exports = router;