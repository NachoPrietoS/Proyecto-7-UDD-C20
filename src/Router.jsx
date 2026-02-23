    import { BrowserRouter, Route, Routes } from "react-router-dom"
    import Layout from "./components/Layout/Index";
    import Home from "./components/Home/Home";
    import GameState from "./contexts/Game/GameState";
    import Register from "./components/Auth/Register";
    import Login from "./components/Auth/Login";
    import GameList from "./components/Game/List/Index";
    import SingleGame from "./components/Game/Single/Index";
    import UserState from "./contexts/User/UserState";
    import AuthRoute from "./routes/Auth";
    import PrivateRoute from "./routes/Private";
    import Profile from "./components/Profile";
    import Checkout from "./components/Checkout";
    import Success from "./components/Success/Success";
    import Cancel from "./components/Cancel/Cancel";

    const Router = () => {
        return (
            <UserState>
                <GameState>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="/games" element={<GameList />} />
                                <Route path="/games/:slug" element={<SingleGame />} />
                                <Route path="/registro" element={<Register />} />
                                <Route path="/iniciar-sesion" element={<AuthRoute component={Login} />} />
                                <Route path="/perfil" element={<PrivateRoute component={Profile} />} />
                                <Route path="/carrito" element={<PrivateRoute component={Checkout} />} />
                                <Route path="/success" element={<PrivateRoute component={Success} />} />
                                <Route path="/cancel" element={<PrivateRoute component={Cancel} />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </GameState>
            </UserState>
        )
    }

    export default Router;