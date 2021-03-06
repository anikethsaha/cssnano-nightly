const { Octokit } = require("@octokit/rest");
const createChangelog = require("./createChangelog");
const { githubToken } = require("./config");
const { version } = require("./utils");
const isNewChanges = require("./isNewChanges");

const octokit = new Octokit({
  auth: `token ${githubToken}`
});

// when running the action for first time. give the first argument of this as
// createChangelog('2019-02-14')
// and after that, keep it null i.e `createChange()` only
const { body } = createChangelog();

function createGithubRelease() {
  octokit.repos
    .createRelease({
      owner: "anikethsaha",
      repo: "cssnano-nightly",
      tag_name: version,
      body,
      draft: false
    })
    .then(res => {
      process.stdout.write(
        "Succesfully created a github release for tag: " + version
      );
    })
    .catch(err => {
      throw new error(err);
      process.exit(1);
    });
}

async function runAsync() {
  const shouldRun = await isNewChanges();

  if (shouldRun) {
    createGithubRelease();
  } else {
    process.stdout.write(
      `There is no new change in the cssnano repo since the last publish from our repo`
    );
  }
}

runAsync();
