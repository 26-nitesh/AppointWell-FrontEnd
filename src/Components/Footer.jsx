import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    color: theme.palette.common.white,
    padding: theme.spacing(4, 0),
    position: 'relative',
    marginTop: 'auto',
    width: '100%',
    bottom: 0,
    zIndex: 1000,
  },
  link: {
    marginLeft: theme.spacing(2),
    color: theme.palette.common.white,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">About Us</Typography>
            <Typography variant="body1">
              We are a healthcare company committed to providing the best quality care to our patients.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Quick Links</Typography>
            <Typography variant="body1">
              <Link href="#" className={classes.link}>
                Home
              </Link>
              <Link href="#" className={classes.link}>
                About
              </Link>
              <Link href="#" className={classes.link}>
                Services
              </Link>
              <Link href="#" className={classes.link}>
                Contact
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

