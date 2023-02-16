import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();

    autoUpdater.on("update-available", () => {
      console.log("NUM EH QUE ACHOU")
    })
  }
}

export default AppUpdater;
