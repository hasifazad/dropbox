import './App.css';
import { useState } from 'react';
import DataTable from './components/DataTable';
import UploadPage from './components/UploadPage';

function App() {
  const butStyle = { backgroundColor: 'green', color: 'white' }
  let [state, setState] = useState(true)

  const onClickHandleOne = () => {
    setState(true)
  }
  const onClickHandleTwo = () => {
    setState(false)
  }


  return (
    <div className="App">
      <div className='box_one'>
        <button className='upload_but' style={state ? butStyle : null} onClick={onClickHandleOne}>Upload File</button>
        <button className='view_but' style={!state ? butStyle : null} onClick={onClickHandleTwo}>View File</button>
      </div>
      {state ?
        <UploadPage /> :
        <DataTable />
      }
    </div>
  );
}

export default App;
