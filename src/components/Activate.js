import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { activate } from "../actions/auth";

const Activate = () => {
    const dispatch = useDispatch();
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');
    const [successful, setSuccessful] = useState(false);

    const activateUser = (e) => {
        dispatch(activate(token))
        .then(() => {
            return <Redirect to="/login" />;
          })
          .catch(() => {
            setSuccessful(false);
          });
    };
    return (
        <div>{activateUser()}</div>);
};
export default Activate;