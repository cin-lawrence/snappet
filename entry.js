const { debug, error: logError } = require('./logger');
const coreLogic = require('./core');

const runSession = async () => {
  await coreLogic();
};

runSession()
  .then(
    () => {
      debug('DONE!');
    },
  )
  .catch(
    (error) => {
      console.dir(error);
    },
  );
