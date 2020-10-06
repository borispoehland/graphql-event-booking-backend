const withISODate = (event) => ({
  ...event,
  date: new Date(event.date).toISOString(),
});

module.exports = {
  withISODate,
};
