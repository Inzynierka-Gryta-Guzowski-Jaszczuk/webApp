import axios from 'axios';
import { useState } from 'react';
const UploadFileExample = () => {
    
    const [file, setFile] = useState();
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('file', file);
        const url = "http://localhost:5000/image/user"
        const { data: res } = await axios.post(url, formData, {
            headers: {'Content-Type': 'multipart/form-data', 'token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzNTFlNThhYmUxYzU3Zjk3ZWZjYzEiLCJpYXQiOjE2OTUxNDI5NTQsImV4cCI6MTY5NTIyOTM1NH0.vJeFl1YRXBtUU8P7Ibcv_gedLneizXnfgteuirQKA6w' }
            })
    }

    const changeHandler = (e) => {
        setFile(e.target.files[0]); 
        console.log("changeHandler", file);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
            <input type='file' onChange={changeHandler}></input>
            <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default UploadFileExample;