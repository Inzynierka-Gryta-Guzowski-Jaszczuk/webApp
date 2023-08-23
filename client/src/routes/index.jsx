import { Route, Routes } from 'react-router-dom';


const UserRoutes = () => {
    const token = localStorage.getItem("token");

    return (
        <div>
            <Routes>
                <Route path="*" element={<h2>Alee</h2>}></Route>

                {token === null ? (
                    <>
                        <Route path="/register" element={<h2>Zarejestruj</h2>}></Route>
                        <Route path="/login" element={<h2>Zaloguj</h2>} ></Route>
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
