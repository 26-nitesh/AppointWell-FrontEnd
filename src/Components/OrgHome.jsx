

import ReviewIcon from '@mui/icons-material/RateReview';
import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { LinkOff } from '@mui/icons-material';
// import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  cardRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  },
  card: {
    maxWidth: 400,
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    },
  },
});

const OrgHome = () => {
  const classes = useStyles();
  const hour = new Date().getHours();
  const welcomeMessage = `Good ${hour < 12 ? 'morning' : 'evening'}`;


  return (
   <>
     <Typography variant="h4">
        {welcomeMessage}
      </Typography>
      <Typography variant="caption" component="h3" style={{ marginBottom: '24px' }}  color="textSecondary">
            Thank you for choosing us.  New to the system ?
            <Link  color="primary" onClick={() => console.log('Later')}>
    click here
  </Link>
          </Typography>
     <div className={classes.cardRow}>
     <Card className={`${classes.card}`}  style={{backgroundColor: "#f6fff2"}}>
     <CardHeader
          title="Review"
        />
        <CardContent >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ReviewIcon fontSize="large" color="primary" />
          </div>
          <Typography variant="body2" color="text.secondary" align="center">
            Hurrah! You've Nothing to review.
          </Typography>
        </CardContent>
      </Card>
      <Card className={`${classes.card}`} style={{backgroundColor: "#f6fff2"}}>
        <CardHeader
          title="Example Card"
          subheader="April 21, 2023"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This is a sample card created with React and Material-UI.
          </Typography>
          <Button variant="contained" onClick={() => console.log("Button clicked!")}>
            Click here to continue
          </Button>
        </CardContent>
      </Card>
      <Card className={`${classes.card}`} style={{backgroundColor: "#f6fff2"}}>
        <CardHeader
          title="Another Card"
          subheader="April 22, 2023"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This is another sample card.
          </Typography>
          <Button variant="contained" onClick={() => console.log("Button clicked!")}>
            Click here to continue
          </Button>
        </CardContent>
      </Card>
      <Card className={`${classes.card}`} style={{backgroundColor: "#f6fff2"}}>
        <CardHeader
          title="Another Card"
          subheader="April 22, 2023"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This is another sample card.
          </Typography>
          <Button variant="contained" onClick={() => console.log("Button clicked!")}>
            Click here to continue
          </Button>
        </CardContent>
      </Card>
    </div>
   </>
  );
};

export default OrgHome;
