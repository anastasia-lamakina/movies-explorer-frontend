import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getUser } from "../../utils/MainApi";

export const PrivateRoute = () => {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const { setName, setEmail, setId } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  useEffect(() => {
    getUser()
      .then((user) => {
        setName(user.name);
        setEmail(user.email);
        setId(user._id);
        setUserSignedIn(true);
      })
      .catch(() => {
        navigate("/");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userSignedIn) {
    return null;
  }

  return <Outlet />;
};
