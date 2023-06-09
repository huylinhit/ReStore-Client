import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import DarkModeButton from "../components/DarkModeButton/DarkModeButton";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { useStoreContext } from "../context/StoreContext";
import { useAppSelector } from "../store/configurationStore";

interface Props {
    darkMode: boolean;
    handleDarkMode: () => void
}

const midLinks = [
    { title: 'home', path: '' },
    { title: 'catalog', path: 'catalog' },
    { title: 'about', path: 'about' },
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
]

const navStyle = {
    color: 'inherit',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'secondary.main'
    }
};

function Header({ darkMode, handleDarkMode }: Props) {
    const {basket} = useAppSelector(state => state.basket);

    const itemCount = basket?.items.reduce((total, item)=> total += item.quantity, 0);


    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        component={NavLink}
                        to='/' variant="h5"
                        sx={{ textDecoration: 'none', color: 'inherit' }}

                    >
                        Re-Store
                    </Typography>
                    <DarkModeButton darkMode={darkMode} handleDarkMode={handleDarkMode} />
                </Box>

                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) =>
                    (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyle}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    )
                    )}
                </List>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton component={Link} to='/basket' size="large" color="inherit" sx={{ mr: 2 }}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    <List sx={{ display: 'flex', alignItems: 'center' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                key={path}
                                to={path}
                                component={NavLink}
                                sx={{ color: 'inherit', typography: 'h6' }}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;