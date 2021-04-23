module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        publish: ['github'],
        productName: 'Gestor de Pedidos Bemyhelp Essencial',
        artifactName: 'Setup_Gestor_Bemyhelp.${ext}',
        appId: 'com.bemyhelp.app',
        copyright: '2021 ${author}',
        win: {
          icon: 'build/icon.png',
          // publisherName: 'Bemyhelp',
          target: [
            {
              target: 'nsis',
              arch: ['ia32'],
            },
          ],
        },
      },
    },
  },
};
