import React, { Fragment } from 'react';
import Login from "./containers/Login";
import Verify from "./containers/Verify";
import SignUp from "./containers/SignUp";
import { Route, Switch } from "wouter";

export default function Home() {
  return (
        <Switch>
            <Route path="/" component={Login} />
            <Route path="/verify" component={Verify} />
            <Route path="/register" component={SignUp} />
        </Switch>
  );
}
