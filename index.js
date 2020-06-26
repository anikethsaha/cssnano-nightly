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
const cssnanoRepoLink = "https://github.com/cssnano/cssnano.git";
const packagesNotToPublish = new Set(pkgLists.notRequiredPkgList);

async function run() {
  // TODO(1) : change `__dirname` to `path`
  const gitClonedPath = __dirname;
  const cssnanoPath = gitClonedPath + "/cssnano";

  const git = simpleGit(gitClonedPath);

  console.log("📝   >  CLONING");

  if (!fs.existsSync(cssnanoPath)) {
    await git.clone(cssnanoRepoLink);
  }

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
  packages.forEach(async (package, i) => {
    const packagePath = cssnanoPath + "/packages/" + package;
    if (packagesNotToPublish.has(package)) {
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
### This is an un-official nightly release of cssnano's ${package} 

In this, the package is named as ${package}-nightly

In from this docs, you need to replace every 

${package} --> ${package}-nightly



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
    packageJson.set("name", `${package}-nightly`);
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
      "bug:",
      "https://github.com/anikethsaha/cssnano-nightly/issues"
    );
    packageJson.set("repository", "anikethsaha/cssnano-nightly");

    if (newdepList[package]) {
      packageJson.set("dependencies", {
        ...newdepList[package]
      });
    }

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
  if (shell.exec("yarn").code === 1) {
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

  console.log("📝   > Committing");
  if (
    shell.exec(
      `git commit -am "publish: v${semver.major}.${semver.minor}.${semver.patch}"`
    ).code === 1
  ) {
    process.stderr.write("Something wrong while committing");
    process.exit(1);
  }

  console.log("✔️   > Done  committing");
}

run();
