const axios = require('axios');
const { json } = require('express');
const NodeCache = require('node-cache');
const myCache = new NodeCache();

//todo: add error
function getDomainUrl(domain) {
    //parse adstxt context to 2d array - each row is a line and in each line array of words
    const domainSplit = domain.split("/");
    let hostName = "";
    let fullUrl = "";
    if (domain.indexOf("//") > -1) {
        fullUrl = domainSplit[0] + "//";
        hostName = domainSplit[2];
    }
    else {
        fullUrl = "http://"
        hostName = domainSplit[0];
    }

    if (hostName.indexOf("www.") != 0) {
        fullUrl = fullUrl + "www." + hostName + "/ads.txt";
    }
    else {
        fullUrl = fullUrl + hostName + "/ads.txt";
    }
    return {
        "FullUrl": fullUrl,
        "Domain": hostName
    };

}

async function getFileArray(adsTxtUrl) {
    //parse adstxt context to 2d array - each row is a line and in each line array of words
    const text = await axios.get(adsTxtUrl);
    if (text.request.res.responseUrl != adsTxtUrl)
        throw {status:400, message:"redirect not ads.txt file"}
    const textByLines = text.data.split(/\r?\n/).filter((line) => line.includes(','));
    const res = textByLines.map((line) => line.split(","));
    return res;
}

async function getTotalAdvertisers(searched) {
    const DomainUrl = getDomainUrl(searched)
    const domain = DomainUrl.Domain;

    let countRes;
    if (myCache.has(domain)) {
        countRes = myCache.get(domain).Results;
    }
    else {
        countRes = await getCount(searched);
        countRes = countRes.Results;
    }
    return { "TotalAdvertisers": countRes.length }
}

async function getCount(searched) {
    //count for each domin
    const startTime = process.hrtime();
    const DomainUrl = getDomainUrl(searched)
    const domain = DomainUrl.Domain;
    const fullUrl = DomainUrl.FullUrl;

    if (myCache.has(domain)) {
        const chachRes = myCache.get(domain);
        chachRes['ParseTime'] = "Chached";
        return chachRes;
    }
    else {
        const fileArray = await getFileArray(fullUrl);
        const dict = {};
        fileArray.forEach(line => {
            let domin = line[0];
            if (dict[domin]) { dict[domin] += 1; }
            else { dict[domin] = 1 }
        });
        const result = Object.keys(dict).map(key => { return { Domain: key, Count: dict[key] } })
        const jsonRes = {
            "Domain": domain,
            // "TotalAdvertisers": result.length,
            "Results": result,
        }
        myCache.set(domain, jsonRes)
        const time = process.hrtime(startTime);
        jsonRes['ParseTime'] = (time[0] * 1000  + time[1]) / 1000000;
        return jsonRes;
    }
}

// function getCount(parsedTxt) {
//     //count for each domin
//     const dict = {};
//     parsedTxt.forEach(line => {
//         let domin = line[0];
//         if (dict[domin]) { dict[domin] += 1; }
//         else { dict[domin] = 1 }
//     });
//     const result = Object.keys(dict).map(key => { return { Domain: key, Count: dict[key] } })
//     return JSON.stringify({"results": result});
// }



exports.getTotalAdvertisers = getTotalAdvertisers;
exports.getCount = getCount;
exports.getDomainUrl = getDomainUrl;