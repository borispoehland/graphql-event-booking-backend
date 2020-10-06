const { mergeTypeDefs } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');

const typeDefs = loadFilesSync(__dirname, { extensions: ['graphql'] });

module.exports = mergeTypeDefs(typeDefs);
