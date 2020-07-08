const date = new Date();
const semver = {
  major: date.getUTCFullYear() - 2020,
  minor: date.getUTCMonth() + 1,
  patch: date.getUTCDate()
};

module.exports = {
  semver,
  version: `${semver.major}.${semver.minor}.${semver.patch}`,
  date,
  getTodayDate: () => {
    const d = new Date();
    return {
      tdate: d.getUTCDate(),
      tyear: d.getUTCFullYear(),
      tmonth: d.getUTCMonth() + 1
    };
  },
  getYesterdayDate: () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return {
      ydate: d.getUTCDate(),
      yyear: d.getUTCFullYear(),
      ymonth: d.getUTCMonth() + 1
    };
  }
};
