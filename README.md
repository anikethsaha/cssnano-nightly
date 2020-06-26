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
