import {Dialog, Terminal} from '#components'
import {useState} from 'react'

function App() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <h1>Kaiverse</h1>
      <button className="kai-button" onClick={() => setOpenDialog(true)}>
        Open dialog
      </button>

      <div className="container mx-auto h-[50dvh] p-4">
        <Terminal title="Terminal" greeting="Welcome to Terminal UI Demo!" />
      </div>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        variant="drawer"
        backdropProps={{
          blur: 2,
        }}
      >
        <Dialog.Header onClose={() => setOpenDialog(false)}>
          <h2>Dialog</h2>
        </Dialog.Header>
        <p>Dialog content</p>
        <Dialog.Footer>Footer</Dialog.Footer>
      </Dialog>
    </>
  )
}

export default App
