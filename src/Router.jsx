import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Index";
import Home from "./components/Home/Home";
import GameState from "./contexts/Game/GameState";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import GameList from "./components/Game/List/Index";

const Router = () => {
    return (
        <GameState>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/registro" element={<Register />} />
                        <Route path="/iniciar-sesion" element={<Login />} />
                        <Route path="/games" element={<GameList />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </GameState>
    )
}

export default Router;