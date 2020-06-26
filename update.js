/**
 * @fileoverview this script will run after the publishing script
 * here
 * 1. it will first prepend a collapsible table with
 *
 * 2. Commit the change with commit message as -m "publish : <version name>"
 */

const simpleGit = require("simple-git/promise");
const fetch = require("node-fetch");
const shell = require("shelljs");
const fs = require("fs");
const { semver } = require("./utils");

const git = simpleGit(__dirname);
const readmeLink =
  "https://raw.githubusercontent.com/anikethsaha/cssnano-nightly/master/versions.md";

fetch(readmeLink)
  .then(res => res.text())
  .then(res => {
    const oldData = res
      .split("\n")
      .slice(0, -1)
      .join("\n");

    const newReadme = `${oldData}

- \`v${semver.major}.${semver.minor}.${semver.patch}\`

`;

    fs.writeFileSync(__dirname + "/versions.md", newReadme);

    shell.exec("git add .");
    shell.exec(`git config --global user.email "anik220798@gmail.com"`);
    shell.exec(`git config --global user.name "aniketh saha"`);
    shell.exec(
      `git commit -m "publish: v${semver.major}.${semver.minor}.${semver.patch} "`
    );
  });
