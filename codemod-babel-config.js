/**
 * @fileoverview This is a codemod to change the cssnano/babel.config.js
 * of each packages/* in `package.json` to suffix with `-nightly`
 * e.g : `postcss-reduce-initial-nightly`
 */

// Press ctrl+space for code completion

const pkgList = require("./packageList");

const pkgListSet = new Set(pkgList.pkgList);
const notRequiredPkgListSet = new Set(pkgList.notRequiredPkgList);
module.exports = function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.Literal)
    .forEach(path => {
      if (
        pkgListSet.has(path.value.value) &&
        !notRequiredPkgListSet.has(path.value.value)
      )
        path.value.value = `${path.value.value}-nightly`;
    })
    .toSource();
};
