import { AppBar } from '@mui/material';
import { Fragment } from 'react';
import tsubasaimage from '../../assets/captain-tsubasa.jpg';
import classes from './Header.module.css';

const Header = () => {
  return (
    <Fragment>
      <AppBar className={classes.header}>
        <h1>VLC FOOTBALL</h1>
      </AppBar>
      <div className={classes['main-image']}>
        <img src={tsubasaimage} alt='VLK Football' />
      </div>
    </Fragment>
  );
};

export default Header;