import { app, Tray, BrowserWindow, globalShortcut, clipboard, screen, ipcMain } from 'electron'

import { creatAppTray } from './tray'
import Store from 'electron-store'
import less from 'less'

$tools.log.info(`Application <${$tools.APP_NAME}> launched.`)

let tray: Tray

app.allowRendererProcessReuse = true

ipcMain.on('Apply Slow Down', (event: any, mes: any) => {
  $tools.windowList.get('Details')?.webContents.send('Slow Down', mes)
})

app.on('ready', () => {
  tray = creatAppTray()
  // $tools.getGlobalStore().set('MyTheme', 6)

  globalShortcut.register('CommandOrControl+C+1', () => {
    $tools.setTheme(1)
    $tools.windowList.get('SearchPage')?.webContents.reload()
  })

  globalShortcut.register('CommandOrControl+C+2', () => {
    $tools.setTheme(2)
    $tools.windowList.get('SearchPage')?.webContents.reload()
  })

  globalShortcut.register('CommandOrControl+C+3', () => {
    $tools.setTheme(3)
    $tools.windowList.get('SearchPage')?.webContents.reload()
  })

  globalShortcut.register('CommandOrControl+C+4', () => {
    $tools.setTheme(4)
    $tools.windowList.get('SearchPage')?.webContents.reload()
  })

  globalShortcut.register('CommandOrControl+C+5', () => {
    $tools.setTheme(5)
    $tools.windowList.get('SearchPage')?.webContents.reload()
  })

  globalShortcut.register('CommandOrControl+C+7', () => {
    $tools.setTheme(6)
    $tools.windowList.get('SearchPage')?.webContents.reload()
  })

  const size = screen.getPrimaryDisplay().workAreaSize
  const width = size.width
  const height = size.height

  $tools.createWindow('Wall', {
    windowOptions: { type: 'desktop', transparent: false, width: width, height: height + 100 },
    createConfig: { showTitlebar: false, showSidebar: false },
  })
})

app.on('activate', () => {
  if (process.platform == 'darwin') {
    // $tools.createWindow('About')
  }
})

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  $tools.log.info(`Application <${$tools.APP_NAME}> has exited normally.`)
  if (process.platform === 'win32') {
    tray.destroy()
  }
})
