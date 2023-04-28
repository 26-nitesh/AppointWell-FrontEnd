// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, isAuthenticated, role, redirectTo, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isAuthenticated && role === localStorage.getItem('type') ? (
//         <Component {...props} />
//       ) : (
//         <Navigate to={redirectTo} />
//       )
//     }
//   />
// );

// export default PrivateRoute;
