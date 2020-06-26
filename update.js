/**
 * @fileoverview this script will run after the publishing script
 * here
 * 1. it will first prepend a collapsible table with
 *
 *    #### <version number (semver)>
 *
 *    |package name|[package-nightly](npm link)| [original package](cssnano repo link) |
 *
 *      on README.md
 *
 * 2. Commit the change with commit message as -m "publish : <version name>"
 */

const simpleGit = require("simple-git/promise");
const shell = require("shelljs");

const git = simpleGit(__dirname);

const packages = shell.ls(__dirname + "/cssnano/packages/");

packages.forEach();
