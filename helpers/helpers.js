const jsonfile = require('jsonfile');

const exportToJson = (data) => {
  const processedData = data.map(({ start, duration, title }) => ({ start, duration, title }));

  jsonfile.writeFile('./assets/events.json', processedData, (err) => {
    console.error(err);
  })
};

module.exports = exportToJson;