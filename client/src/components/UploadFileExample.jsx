import axios from 'axios';
import { useState } from 'react';
const UploadFileExample = () => {
    
    const [file, setFile] = useState();
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('file', file);
        const url = "http://localhost:8080/image/user/7s"
        const { data: res } = await axios.post(url, formData, {
            headers: {'Content-Type': 'multipart/form-data' }
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