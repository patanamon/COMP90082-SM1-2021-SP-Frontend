import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({ auth, ...props }) => {
    return auth
        ? (<Redirect to="/coordinator" />)
        : (<Route {...props} />)
};