//import { makeStyles } from '@mui/material/styles';
//immport { makeStyles } from '@mui/styles';
import { makeStyles } from '@material-ui/core/styles';
import {theme} from './theme'

export const commonStyles = makeStyles((theme1) => ({

    page_wrapper: {
            "& .button": {
                backgroundColor: theme.palette.secondary.dark,
                color: theme.palette.text.white,
                "&:hover": {
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.text.black,
                },
            },

            "& .loginWrapper": {
                margin: 'auto',
                width: '50%',
                padding: '10px',
                "& .heading2": {
                    color: theme.palette.primary.main,
                    marginLeft: '15%'
                },
                "& .btnLogin": {
                    backgroundColor: theme.palette.secondary.dark,
                    color: theme.palette.text.white,
                    "&:hover": {
                    backgroundColor: theme.palette.secondary.light,
                    color: theme.palette.text.black,
                    },
                },
            },
            "& .shopPage": {
                backgroundColor: "black",
                margin: 'auto',
                width: '100%',
            }
    }


    
    
}))