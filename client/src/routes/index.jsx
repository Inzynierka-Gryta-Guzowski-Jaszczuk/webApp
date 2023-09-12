import { Route, Routes } from 'react-router-dom';
import Login from '../components/login';
import UploadFileExample from '../components/UploadFileExample';
const UserRoutes = () => {
    const token = localStorage.getItem("token");

    return (
        <div>
            <Routes>
            <Route path='/file' element={<UploadFileExample/>}></Route>
                <Route path="*" element={<h2>Alee</h2>}></Route>

                {token === null ? (
                    <>
                        <Route path="/register" element={<h2>Zarejestruj</h2>}></Route>
                        <Route path="/login" element={<Login></Login>} ></Route>
                    </>
                ) : (
                    <>
                        <Route path="/logout" ></Route>
                    </>
                )}
            </Routes>
        </div>
    )
}
export default UserRoutes;
