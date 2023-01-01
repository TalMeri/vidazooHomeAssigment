const axios = require("axios");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

function getDomainUrl(searchedVal) {
  //convert search value to full url to ads.txt
  const searchedValLowerCase = searchedVal.toLowerCase()
  const searchedValSplit = searchedValLowerCase.split("/");
  let hostName = "";
  let fullUrl = "";
  if (searchedVal.indexOf("//") > -1) {
    fullUrl = searchedValSplit[0] + "//";
    hostName = searchedValSplit[2];
  } else {
    fullUrl = "https://";
    hostName = searchedValSplit[0];
  }

  if (hostName.indexOf("www.") != 0) {
    fullUrl = fullUrl + "www." + hostName + "/ads.txt";
  } else {
    fullUrl = fullUrl + hostName + "/ads.txt";
  }
  return {
    FullUrl: fullUrl,
    Domain: hostName,
  };
}

async function getFileArray(adsTxtUrl) {
  //parse adstxt context to 2d array - each row is a line and in each line array of words
  try {
    const text = await axios.get(adsTxtUrl);
    if (text.request.res.responseUrl != adsTxtUrl)
      throw { status: 400, message: "redirect - not ads.txt file" };
    const textByLines = text.data
      .split(/\r?\n/)
      .filter((line) => line.includes(","));
    const res = textByLines.map((line) => line.split(","));
    return res;
  } catch {
    throw { status: 400, message: "failed to parse ads.txt file" };
  }
}

async function getCount(searchedVal) {
  //count for each domin
  const startTime = process.hrtime();
  const DomainUrl = getDomainUrl(searchedVal);
  const domain = DomainUrl.Domain;
  const fullUrl = DomainUrl.FullUrl;

  if (myCache.has(domain)) {
    const chachRes = myCache.get(domain);
    chachRes["ParseTime"] = 0;
    return chachRes;
  } else {
    const fileArray = await getFileArray(fullUrl);
    const dict = {};
    fileArray.forEach((line) => {
      let domin = line[0];
      if (dict[domin]) {
        dict[domin] += 1;
      } else {
        dict[domin] = 1;
      }
    });
    const result = Object.keys(dict).map((key) => {
      return { Domain: key, Count: dict[key] };
    });
    const jsonRes = {
      Domain: domain,
      Results: result,
    };
    myCache.set(domain, jsonRes);
    const time = process.hrtime(startTime);
    const ParseTime = (time[0] * 1000 + time[1]) / 1000000;
    jsonRes["ParseTime"] = +ParseTime.toFixed(3)
    return jsonRes;
  }
}

exports.getCount = getCount;

