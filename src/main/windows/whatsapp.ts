import { BrowserWindow, session } from 'electron';
import { getAssetPath, getPreloadPath } from '../util';
    import MenuBuilder from '../menu';
import Store from 'electron-store';

class WhatsappWindow {
  window: BrowserWindow;
  constructor() {
    const store = new Store();

    require('electron-debug')();

    this.window = new BrowserWindow({
      show: false,
      width: 800,
      height: 800,
      icon: getAssetPath('icon.png'),
      frame: false,
      resizable: false,
      webPreferences: {
        // contextIsolation: false,
        nodeIntegration: true,
        // nodeIntegrationInWorker: true,
        allowRunningInsecureContent: true,

        webSecurity: false,
        devTools: true,
        preload: getPreloadPath('main'),
      },
    });

    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': ["*"],
        },
      });
    });

    this.window.loadURL('https://web.whatsapp.com/');

    this.window.on('ready-to-show', () => {
      if (!this.window) {
        throw new Error('"mainWindow" is not defined');
      }
    });
    // this.window.show();

    const menuBuilder = new MenuBuilder(this.window);
    menuBuilder.buildMenu();

    const glutoesKey = store.get('glutoes-key');
    this.window.webContents.send('SAVE_GLUTOES_KEY', glutoesKey);

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
  }
}

export default WhatsappWindow;
