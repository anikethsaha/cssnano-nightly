const fetch = require("node-fetch");
const { date, getTodayDate, getYesterdayDate } = require("./utils");
const { githubToken } = require("./config");
const { tdate, tmonth, tyear } = getTodayDate();
const { ydate, ymonth, yyear } = getYesterdayDate();

const yesterdayDate = `${yyear}-${ymonth}-${ydate}`;
const todayDate = `${tyear}-${tmonth}-${tdate}`;

let cssnanoLastCommitDate;

async function isNewChange() {
  let dm = await fetch(
    //   temporary adding the "'2019-02-14'", replace it with `yesterdayDate`
    `https://api.github.com/repos/cssnano/cssnano/commits?branch=master&since=${yesterdayDate}&until=${todayDate}`,
    {
      headers: {
        Authorization: "token " + process.env.OAUTH_TOKEN
      }
    }
  );
  dm = await dm.json();
  console.log({ dm });
  return Array.isArray(dm) && dm.length > 0;
}

module.exports = isNewChange;
