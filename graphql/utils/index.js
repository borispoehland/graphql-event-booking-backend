const withISODate = (obj) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);

  return keys.reduce(function (cur, key, idx) {
    const value = values[idx];
    if (value instanceof Date) {
      return { ...cur, [key]: new Date(value).toISOString() };
    } else {
      return { ...cur, [key]: value };
    }
  }, {});
};

module.exports = {
  withISODate,
};
