import { Route, Routes } from 'react-router-dom';
import Login from '../components/login';
import Register from '../components/register';

const UserRoutes = () => {
    const token = localStorage.getItem("token");

    return (
        <div>
            <Routes>
                <Route path="*" element={<h2>Alee</h2>}></Route>

                {token === null ? (
                    <>
                        <Route path="/register" element={<Register></Register>}></Route>
                        <Route path="/login" element={<Login></Login>} ></Route>
                    </>
                ) : (
                    <>
                        <Route path="/logout" element={localStorage.removeItem("token")}></Route>
                    </>
                )}
            </Routes>
        </div>
    )
}
export default UserRoutes;
