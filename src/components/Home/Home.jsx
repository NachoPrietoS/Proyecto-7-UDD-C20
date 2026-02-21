import GameList from "../Game/List/Index";
import { Box } from "@mui/material";
import Hero from "./Hero";
import Categories from "./Categories";


const Home = () => {
    return (
        <Box>
            <Hero />
            <Categories />
        </Box>
    )
}

export default Home;