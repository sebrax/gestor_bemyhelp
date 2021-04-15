export default {
  install(Vue) {
    Vue.prototype.$Printer = {
      webview: null,
      bindIpcMessage: function() {
        Vue.nextTick(() => {
          this.webview = document.querySelector('webview');
          this.webview.addEventListener('ipc-message', async event => {
            if (event.channel == 'pong') {
              await this.webview.print({
                silent: true,
                printBackground: true,
                deviceName: require('electron').ipcRendered.sendSync(
                  'getPrinterDefaultName'
                ),
              });
            }
          });
        });
      },
      printPage(printHtml) {
        this.webview.send('ping', printHtml);
      },
    };
  },
};
