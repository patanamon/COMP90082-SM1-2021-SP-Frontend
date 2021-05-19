import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute =  ({ auth, ...props }) => {
    return auth
        ? (<Route {...props} />)
        : (<Redirect to="/login" />)
};