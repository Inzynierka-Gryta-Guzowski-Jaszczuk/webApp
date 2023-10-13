import { Route, Routes } from 'react-router-dom';
import Login from '../components/login';
import Register from '../components/register';
import UploadFileExample from '../components/UploadFileExample';
import Recipes from '../components/recipes';
import RecipesDetails from '../components/recipes/recipesDetail';
const UserRoutes = () => {
    const token = localStorage.getItem("token");

    return (
        <div>
            <Routes>
            <Route path='/file' element={<UploadFileExample/>}></Route>
            <Route path='/recipes' element={<Recipes></Recipes>}></Route>
            <Route path='/recipes/:id' element={<RecipesDetails></RecipesDetails>}></Route>
                <Route path="*" element={<h2>Alee</h2>}></Route>

                {token === null ? (
                    <>
                        <Route path="/register" element={<Register></Register>}></Route>
                        <Route path="/login" element={<Login></Login>} ></Route>
                    </>
                ) : (
                    <>
                        {/* <Route path="/logout" element={localStorage.removeItem("token")}></Route> */}
                    </>
                )}
            </Routes>
        </div>
    )
}
export default UserRoutes;
