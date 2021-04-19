module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  pluginOptions: {
    electronBuilder: {
      // externals: ['escpos', 'escpos-serialport'],
      nodeIntegration: true,
      builderOptions: {
        productName: 'Gestor de Pedidos Bemyhelp Essencial',
        artifactName: 'Setup_Gestor_Bemyhelp.${ext}',
        appId: 'com.bemyhelp.app',
        /* extraFiles: [
          {
            'from': 'build'
          }
        ], */
        win: {
          icon: 'build/icon.png',
          publisherName: 'Bemyhelp',
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
