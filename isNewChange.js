const fetch = require("node-fetch");
const { date } = require("./utils");

let cssnanoLastCommitDate;

async function isNewChange() {
  let latestMasterCommit = await fetch(
    "https://api.github.com/repos/cssnano/cssnano/commits/master",
    {
      headers: {
        Authorization: "token " + process.env.OAUTH_TOKEN
      }
    }
  );

  latestMasterCommit = await latestMasterCommit.json();
  console.log({ latestMasterCommit });
  let cssnanoCommit = await fetch(
    `https://api.github.com/repos/cssnano/cssnano/git/commits/${latestMasterCommit.sha}`,
    {
      headers: {
        Authorization: "token " + process.env.OAUTH_TOKEN
      }
    }
  );

  cssnanoCommit = await cssnanoCommit.json();
  cssnanoLastCommitDate = new Date(cssnanoCommit.committer.date);
  let nightlyCommit = await fetch(
    "https://api.github.com/repos/anikethsaha/cssnano-nightly/commits/master",
    {
      headers: {
        Authorization: "token " + process.env.OAUTH_TOKEN
      }
    }
  );

  nightlyCommit = await nightlyCommit.json();
  const { message, committer } = nightlyCommit.commit;
  const lastNightlyPubCommit = new Date(committer.date);

  return cssnanoLastCommitDate.getTime() > lastNightlyPubCommit.getTime();
}

module.exports = isNewChange;
