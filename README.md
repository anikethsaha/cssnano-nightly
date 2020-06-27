# cssnano-nightly

This is an un-official releases for [cssnano](https://github.com/cssnano/cssnano) that is released every 24hrs by checking if there is
any new commits in the main repo's `master` branch.

> Note: This may contain unstable code as this is not the offical release.

## How to use it.

Everything is same. Just the package name is being suffixed with `-nightly`
so , for `cssnano` - change it to `cssnano-nightly`, `cssnano-preset-default` -> `cssnano-preset-default-nightly` and all other package present in the presets.

## How the version is being managed.

It takes the date as version.

| year - 2020 | month | date  |
| ----------- | ----- | ----- |
| major       | minor | patch |

So if date is **26 Jun 2020**, it would be

**`v0.6.26`**

#### Refer the [`versions.md`](./versions.md) file for the latest version

## List of package

| original name                      | new Name                                   |
| ---------------------------------- | ------------------------------------------ |
| cssnano                            | cssnano-nightly                            |
| cssnano-preset-default             | cssnano-preset-default-nightly             |
| cssnano-preset-advanced            | cssnano-preset-advanced-nightly            |
| postcss-colormin                   | postcss-colormin-nightly                   |
| postcss-convert-values             | postcss-convert-values-nightly             |
| postcss-discard-comments           | postcss-discard-comments-nightly           |
| postcss-discard-duplicates         | postcss-discard-duplicates-nightly         |
| postcss-discard-empty              | postcss-discard-empty-nightly              |
| postcss-discard-overridden         | postcss-discard-overridden-nightly         |
| postcss-merge-longhand             | postcss-merge-longhand-nightly             |
| postcss-merge-rules                | postcss-merge-rules-nightly                |
| postcss-minify-font-values         | postcss-minify-font-values-nightly         |
| postcss-minify-gradients           | postcss-minify-gradients-nightly           |
| postcss-minify-params              | postcss-minify-params-nightly              |
| postcss-minify-selectors           | postcss-minify-selectors-nightly           |
| postcss-normalize-charset          | postcss-normalize-charset-nightly          |
| postcss-normalize-display-values   | postcss-normalize-display-values-nightly   |
| postcss-normalize-positions        | postcss-normalize-positions-nightly        |
| postcss-normalize-repeat-style     | postcss-normalize-repeat-style-nightly     |
| postcss-normalize-string           | postcss-normalize-string-nightly           |
| postcss-normalize-timing-functions | postcss-normalize-timing-functions-nightly |
| postcss-normalize-unicode          | postcss-normalize-unicode-nightly          |
| postcss-normalize-url              | postcss-normalize-url-nightly              |
| postcss-normalize-whitespace       | postcss-normalize-whitespace-nightly       |
| postcss-ordered-values             | postcss-ordered-values-nightly             |
| postcss-reduce-initial             | postcss-reduce-initial-nightly             |
| postcss-reduce-transforms          | postcss-reduce-transforms-nightly          |
| postcss-svgo                       | postcss-svgo-nightly                       |
| postcss-unique-selectors           | postcss-unique-selectors-nightly           |
| postcss-discard-unused-nightly     | postcss-discard-unused-nightly             |
| postcss-merge-idents-nightly       | postcss-merge-idents-nightly               |
| postcss-reduce-idents-nightly      | postcss-reduce-idents-nightly              |
| postcss-zindex-nightly             | postcss-zindex-nightly                     |
