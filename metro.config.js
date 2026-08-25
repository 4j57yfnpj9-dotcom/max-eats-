const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

const STUB_MODULE = path.resolve(__dirname, 'metro-stubs/empty.js');

// @anthropic-ai/sdk statically imports several Node-only builtins purely to
// support its local `ant auth login` credential-file cache — a code path
// this app never reaches, since we always construct the client with an
// explicit apiKey. Metro still has to resolve every static import in the
// graph, and React Native has no Node core modules, so redirect just these
// specifiers — and only when the importer is inside the SDK — to a harmless
// empty stub instead of failing the whole bundle.
const NODE_BUILTINS_USED_BY_SDK_CREDENTIAL_CHAIN = new Set([
  'node:fs',
  'node:fs/promises',
  'node:path',
  'node:crypto',
  'node:buffer',
]);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    NODE_BUILTINS_USED_BY_SDK_CREDENTIAL_CHAIN.has(moduleName) &&
    context.originModulePath.includes(`${path.sep}@anthropic-ai${path.sep}sdk${path.sep}`)
  ) {
    return { type: 'sourceFile', filePath: STUB_MODULE };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
