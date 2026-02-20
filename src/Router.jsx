import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Index";
import Home from "./components/Home/Home";
import GameState from "./contexts/Game/GameState";

const Router = () => {
    return (
        <GameState>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </GameState>
    )
}

export default Router;