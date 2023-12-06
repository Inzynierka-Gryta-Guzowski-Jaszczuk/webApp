import { Route, Routes } from 'react-router-dom';
import Login from '../components/login';
import Register from '../components/register';
import UploadFileExample from '../components/UploadFileExample';
import Recipes from '../components/recipes';
import RecipesDetails from '../components/recipes/recipesDetail';
import Categories from '../components/recipes/categories';
import UserRecipes from '../components/recipes/userRecepies';
import AddRecipe from '../components/recipes/addRecipe';
import SavedRecipes from '../components/recipes/savedRecepies';
import SearchRecipes from '../components/recipes/searchRecipe';
const UserRoutes = () => {
    const token = localStorage.getItem("token");

    return (
        <div>
            <Routes>
            <Route path='/file' element={<UploadFileExample/>}></Route>
            <Route path='/przepisy' element={<Recipes></Recipes>}></Route>
            <Route path='/przepisy/:id' element={<RecipesDetails></RecipesDetails>}></Route>
            <Route path='/kategorie/:id' element={<Categories></Categories>}></Route>
            <Route path='/twoja_lodowka' element={<SearchRecipes></SearchRecipes>}></Route>
            

                {token === null ? (
                    <>
                        <Route path="/zarejestruj" element={<Register></Register>}></Route>
                        <Route path="/zaloguj" element={<Login></Login>} ></Route>
                    </>
                ) : (
                    <>
                     <Route path='/twoje_przepisy' element={<UserRecipes></UserRecipes>}></Route>
                     <Route path='/ksiazka_kucharska' element={<SavedRecipes></SavedRecipes>}></Route>
                     <Route path='/dodaj_przepis' element={<AddRecipe/>}></Route>
                     <Route path='/edytuj_przepis/:id' element={<AddRecipe></AddRecipe>}/>
                        
                    </>
                )}

                <Route path="*" element={<h2>Alee</h2>}></Route>
            </Routes>
        </div>
    )
}
export default UserRoutes;
