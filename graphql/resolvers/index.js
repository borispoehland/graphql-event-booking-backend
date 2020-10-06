const { mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');

const resolvers = loadFilesSync(__dirname, { ignoreIndex: true });

module.exports = mergeResolvers(resolvers);
