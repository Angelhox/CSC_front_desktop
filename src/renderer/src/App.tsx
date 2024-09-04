import { Toaster } from 'sonner'
import LoggedNavigation from './src/routes/LoggedNavigation'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      {' '}
      <LoggedNavigation />
      <Toaster />
    </>
  )
}

export default App
