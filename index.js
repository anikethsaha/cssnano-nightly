const publish = require("./publish");
const isNewChange = require("./isNewChange");

async function runAsync() {
  const shouldRun = await isNewChange();
  if (shouldRun) {
    publish();
  } else {
    process.stdout.write(
      `There is no new change in the cssnano repo since the last publish from our repo`
    );
  }
}

runAsync();
