import {useEffect, useState, useContext} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../../store/theme-context';

const CustomAppBar = styled(AppBar)`
    box-shadow: rgb(90 114 123 / 11%) 0px 7px 30px 0px;
    border-radius:20px;
    margin-bottom: 40px;
    padding: 0px;
    background-color: ${({ theme }) => theme.palette.background.default};
`


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.mode === 'dark' ? alpha(theme.palette.common.white, 0.15) : alpha(theme.palette.common.black, 0.05),
    '&:hover': {
        backgroundColor: theme.mode === 'dark' ? alpha(theme.palette.common.white, 0.25) : alpha(theme.palette.common.black, 0.15),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '15ch',
            '&:focus': {
                width: '25ch',
            },
        },
    },
}));

function SearchBar(props) {

    const { searchHandler } = props;

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx;

    const { t } = useTranslation()

    const [searchVal, setSearchVal] = useState('');

    const searchChangeHandler = (e) => {
        setSearchVal(e.target.value);
    }

    useEffect(() => {
        const searchTimeout = setTimeout(() => {
            searchHandler(lang, searchVal);
        }, 500)
        return () => clearTimeout(searchTimeout);
    }, [searchVal, lang, searchHandler])


    return (
        <Box sx={{ flexGrow: 1 }}>
            <CustomAppBar position="static">
                <Toolbar sx={{ minHeight: 50 }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', textTransform: 'capitalize' } }}
                    >
                        {t('search')}
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder={t('Search...')}
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchVal}
                            onChange={searchChangeHandler}
                        />
                    </Search>
                </Toolbar>
            </CustomAppBar>
        </Box>
    );
}

export default SearchBar;