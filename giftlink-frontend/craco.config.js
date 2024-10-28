/* eslint-disable no-undef */
module.exports = {
  webpack: {
    devServer: {
      setupMiddlewares: function (middlewares, devServer) {
        if (fs.existsSync(paths.proxySetup)) {
          require(paths.proxySetup)(devServer.app);
        }

        middlewares.push(
          evalSourceMapMiddleware(devServer),
          redirectServedPath(paths.publicUrlOrPath),
          noopServiceWorkerMiddleware(paths.publicUrlOrPath)
        );

        return middlewares;
      },
    },
  },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    delete devServerConfig.onBeforeSetupMiddleware;
    delete devServerConfig.onAfterSetupMiddleware;
    return devServerConfig;
  },
};
