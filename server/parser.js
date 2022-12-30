const express = require("express");
const router = express.Router();
const parser_utils = require("./utils/parser_utils");
const NodeCache = require('node-cache');
const myCache = new NodeCache();

router.get("/download", async (req, res, next) => {
  try {

  } catch (error) {
    return next(error);
  }
});

router.get("/getTotalAdvertisers", async (req, res, next) => {
  try {
    const results = await parser_utils.getTotalAdvertisers(req.query.adsTxtUrl);
    res.send(results);

  } catch (error) {
    return next(error);
  }
});

router.get("/getDomain", (req, res, next) => {
  try {
    const results = parser_utils.getDomainUrl(req.query.adsTxtUrl);
    res.send({"Domain": results.Domain})

  } catch (error) {
    return next(error);
  }
});

router.get("/getCount", async (req, res, next) => {
    try {
      const results = await parser_utils.getCount(req.query.adsTxtUrl);
      res.send(results);
      // const searched = req.query.adsTxtUrl;
      // const results = parser_utils.getDomainUrl(searched)
      // const domain = results.Domain;
      // const fullUrl = results.FullUrl;
      // if(myCache.has(domain)){
      //   res.send(myCache.get(domain));
      // }
      // else {
      //   const fileArray = await parser_utils.getFileArray(fullUrl);
      //   const ArrayCount = parser_utils.getCount(fileArray);
      //   myCache.set(domain, ArrayCount)
      //   res.send(ArrayCount);
      // }
    } catch (error) {
      return next(error);
    }
  });

  module.exports = router;