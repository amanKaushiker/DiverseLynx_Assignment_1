exports.timeExtractor = (unixTimeStamp) => {
  const date = new Date(unixTimeStamp);
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
};
