const { semver } = require("./utils");

const version = `^${semver.major}.${semver.minor}.${semver.patch}`;

module.exports = {
  cssnano: {
    cosmiconfig: "^5.2.1",
    "cssnano-preset-default-nightly": version,
    "is-resolvable": "^1.1.0",
    "opencollective-postinstall": "^2.0.2",
    postcss: "^7.0.16"
  },
  "cssnano-preset-default": {
    "css-declaration-sorter": "^5.1.2",
    "cssnano-utils-nightly": version,
    postcss: "^7.0.16",
    "postcss-calc": "^7.0.1",
    "postcss-colormin-nightly": version,
    "postcss-convert-values-nightly": version,
    "postcss-discard-comments-nightly": version,
    "postcss-discard-duplicates-nightly": version,
    "postcss-discard-empty-nightly": version,
    "postcss-discard-overridden-nightly": version,
    "postcss-merge-longhand-nightly": version,
    "postcss-merge-rules-nightly": version,
    "postcss-minify-font-values-nightly": version,
    "postcss-minify-gradients-nightly": version,
    "postcss-minify-params-nightly": version,
    "postcss-minify-selectors-nightly": version,
    "postcss-normalize-charset-nightly": version,
    "postcss-normalize-display-values-nightly": version,
    "postcss-normalize-positions-nightly": version,
    "postcss-normalize-repeat-style-nightly": version,
    "postcss-normalize-string-nightly": version,
    "postcss-normalize-timing-functions-nightly": version,
    "postcss-normalize-unicode-nightly": version,
    "postcss-normalize-url-nightly": version,
    "postcss-normalize-whitespace-nightly": version,
    "postcss-ordered-values-nightly": version,
    "postcss-reduce-initial-nightly": version,
    "postcss-reduce-transforms-nightly": version,
    "postcss-svgo-nightly": version,
    "postcss-unique-selectors-nightly": version
  },
  "cssnano-preset-advanced": {
    autoprefixer: "^9.5.1",
    "cssnano-preset-default-nightly": version,
    "postcss-discard-unused-nightly": version,
    "postcss-merge-idents-nightly": version,
    "postcss-reduce-idents-nightly": version,
    "postcss-zindex-nightly": version
  },
  "cssnano-preset-lite": {
    "cssnano-utils-nightly": version,
    postcss: "^7.0.16",
    "postcss-discard-comments-nightly": "version",
    "postcss-normalize-whitespace-nightly": "version",
    "postcss-discard-empty-nightly": "version"
  },
  "postcss-merge-longhand": {
    "css-color-names": "^1.0.1",
    postcss: "^7.0.16",
    "postcss-value-parser": "^3.3.1",
    "stylehacks-nightly": version
  }
};
