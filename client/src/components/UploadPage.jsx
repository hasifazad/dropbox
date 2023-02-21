import React, { useState } from 'react'
import './UploadPage.css'
import axios from 'axios'

function UploadPage() {

    let [state, setState] = useState()
    let [msg, setMsg] = useState({ status: false, message: '' })


    const onInputChange = (e) => {
        setMsg({ status: false, message: '' })
        setState(e.target.files[0])
    }

    const onClickHandle = () => {
        let formdata = new FormData()
        formdata.append('image', state)
        axios.post('http://localhost:3000/', formdata, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((res) => {
                setMsg(res.data)
                setState(null)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className='upload_page'>
            <input onChange={onInputChange} className='input_field' type='file' name='file' />
            <div className='upload_page_box_one'>
                {msg.status ? <span style={{ color: 'green', textAlign: 'center' }}>{msg.message}</span> : null}
                {state ? <button className='up_but' onClick={onClickHandle}>Upload</button> : null}
            </div>
        </div>
    )
}

export default UploadPage