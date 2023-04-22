// import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import CloseIcon from '@material-ui/icons/Close';
// import {  Alert, IconButton } from '@mui/material';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     position: 'relative',
//     marginTop: theme.spacing(2),
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     color: theme.palette.grey[500],
//   },
// }));

// export default function MyAlert(props) {
//   const classes = useStyles();
//   const [open, setOpen] = useState(true);

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className={classes.root}>
//       {open && (
//         <Alert severity={props.severity} onClose={handleClose}>
//           <IconButton
//             aria-label="close"
//             color="inherit"
//             size="small"
//             onClick={handleClose}
//             className={classes.closeButton}
//           >
//             <CloseIcon fontSize="inherit" />
//           </IconButton>
//           {props.message}
//         </Alert>
//       )}
//     </div>
//   );
// }
