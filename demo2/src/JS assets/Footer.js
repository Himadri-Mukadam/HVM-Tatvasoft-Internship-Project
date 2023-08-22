import { Typography } from '@mui/material';
import '../CSS assets/MyStyle.css';

export const Footer = () => {
    let copyright = String.fromCodePoint(0x00A9);
    return(
        <div className='footer'>
            <Typography style={{
                paddingTop: '20px',
                fontSize: '18px'
            }}>
                World Of Books
            </Typography>
            <Typography>
                {copyright} RVM Software Solutions
            </Typography>
        </div>
    )
}