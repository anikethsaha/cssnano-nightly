/**
 * @fileoverview This is the main file which clones the latest cssnano project
 * change each package.json.name to suffix `-nightly` and then
 * and the also changes the dependencies for presets, cssnano, css-size
 * as well.
 *
 * @Steps
 *
 * 1. ✔️ change all package name to suffix with `-nightly`
 * 2. ✔️ change the dep of presets and cssnano
 * 3. ✔️ change the `babel.config.js` alias mapping with the new name i.e `*-nightly`
 * 4. ✔️ change the content of readme
 *
 */

const simpleGit = require("simple-git/promise");
const tmp = require("tmp");
const fs = require("fs");
const shell = require("shelljs");
const rimraf = require("rimraf");
const editJsonFile = require("edit-json-file");
const newdepList = require("./dependenciesList");
const pkgLists = require("./packageList");
const { semver } = require("./utils");
const isNewChange = require("./isNewChange");
const { registry } = require("./config");
const cssnanoRepoLink = "https://github.com/cssnano/cssnano.git";
const packagesNotToPublish = new Set(pkgLists.notRequiredPkgList);

shell.config.fatal = true;

module.exports = async function run(registryUrl = registry) {
  if (!fs.existsSync(__dirname + "/.npmrc")) {
    process.stdout.write("Couldnt find `.npmrc`. Please run `sh npm.sh` first");
    return;
  }

  // TODO(1) : change `__dirname` to `path`
  const gitClonedPath = __dirname;
  const cssnanoPath = gitClonedPath + "/cssnano";

  const git = simpleGit(gitClonedPath);

  console.log("📝   >  CLONING");

  if (fs.existsSync(cssnanoPath)) {
    await rimraf.sync(cssnanoPath);
  }

  await git.clone(cssnanoRepoLink);

  console.log("✔️   > CLONING COMPLETE\n");
  await shell.cd("cssnano");
  if (![15, 16].includes(shell.ls().length)) {
    process.stderr.write(
      "Something wrong with the project root folder's count. Please re-check",
      "got " + shell.ls().length + "projects instead of 15"
    );
    process.exit(1);
  }

  const packages = shell.ls("packages/");

  console.log(
    "📝   > Starting changing Package name and dep of respective `package.json`"
  );
  packages.forEach(async (pkg, i) => {
    const packagePath = cssnanoPath + "/packages/" + pkg;
    if (packagesNotToPublish.has(pkg)) {
      rimraf.sync(packagePath);
      return;
    }

    if (!fs.existsSync(packagePath)) {
      process.stderr.write(
        "Cant locate path for " + packagePath + "Please re check. Exiting..."
      );
      process.exit(1);
    }

    try {
      const data = fs.readFileSync(packagePath + "/README.md", "utf8");
      const newData = `
### This is an un-official nightly release of cssnano's ${pkg} 

In this, the package is named as ${pkg}-nightly

In from this docs, you need to replace every 

${pkg} --> ${pkg}-nightly



***
Original Docs below
***

${data}
`;

      const writeStatus = fs.writeFileSync(packagePath + "/README.md", newData);
    } catch (error) {
      throw new Error(error);
    }

    let packageJson = editJsonFile(`${packagePath}/package.json`);
    packageJson.set("name", `${pkg}-nightly`);
    packageJson.set(
      "version",
      `${semver.major}.${semver.minor}.${semver.patch}`
    );
    packageJson.set("author", "Anix <anik220798@gmail.com>");
    packageJson.set(
      "homepage",
      "https://github.com/anikethsaha/cssnano-nightly"
    );
    packageJson.set(
      "bug",
      "https://github.com/anikethsaha/cssnano-nightly/issues"
    );

    packageJson.set("repository", "anikethsaha/cssnano-nightly");

    if (newdepList[pkg]) {
      packageJson.set("dependencies", {
        ...newdepList[pkg]
      });
    }
    shell.cp("-R", __dirname + "/.npmrc", packagePath);
    packageJson.save();
  });

  console.log(
    "✔️   > Completed changing Package name and dependencies of respective `package.json`  \n"
  );

  console.log("📝   > Running the codemod to change `cssnano/babel.config.js");
  const { code } = shell.exec(
    "npx jscodeshift --verbose=2 --no-babel -t ../codemod-babel-config.js ./babel.config.js"
  );
  if (code === 1) {
    process.stderr.write(
      "Something wron while running the codemod in `babel.config.js`"
    );
    process.exit(1);
  }

  console.log(
    "✔️   > Completed the running of codemod  in cssnano/babel.config.js \n"
  );

  console.log("📝   > Installing  dep");
  if (shell.exec("yarn install").code === 1) {
    process.stderr.write("Something wrong while installing dep");
    process.exit(1);
  }
  console.log("✔️   > Done Installing  dep");

  console.log("📝   > Linking  dep");
  if (shell.exec("npx lerna link").code === 1) {
    process.stderr.write("Something wrong while Linking dep");
    process.exit(1);
  }
  console.log("✔️   > Done Linking  dep");

  packages.forEach(pkg => {
    if (packagesNotToPublish.has(pkg)) {
      return;
    }
    const packagePath = cssnanoPath + "/packages/" + pkg;
    shell.cd(packagePath);
    console.log(
      "is dist present in " + pkg + "?",
      fs.existsSync(packagePath + "/dist")
    );
    if (fs.existsSync(packagePath + "/dist")) {
      let packageJson = editJsonFile(`${packagePath}/package.json`);
      packageJson.set("scripts.prepublish", "");
      packageJson.set("scripts.prebuild", "");
      packageJson.save();
      console.log("publishing ", pkg);
      shell.exec("npm publish");
    }
  });
};
