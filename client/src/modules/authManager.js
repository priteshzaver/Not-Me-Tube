import firebase from "firebase/app";
import "firebase/auth";
import { getParameters } from "../helpers/apiHelpers";

const userProfileUrl = "/api/userprofile";

export const getToken = () => {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    throw new Error("Cannot get current user. Did you forget to login?");
  }
  return currentUser.getIdToken();
};

export const getUserDetails = (firebaseUserId) => {
  return getToken().then((token) => {
    return fetch(
      `${userProfileUrl}/${firebaseUserId}`,
      getParameters(token)
    ).then((res) => res.json());
  });
};

const doesUserExist = (firebaseUserId) => {
  return getToken().then((token) => {
    return fetch(
      `${userProfileUrl}/DoesUserExist/${firebaseUserId}`,
      getParameters(token)
    ).then((res) => res.json());
  });
};

export const login = (email, pw) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, pw)
    .then((signInResponse) => doesUserExist(signInResponse.user.uid))
    .then((doesUserExistResponse) => {
      if (!doesUserExistResponse) {
        logout();

        throw new Error(
          "Something's wrong. The user exists in firebase, but not in the application database."
        );
      } else {
        _onLoginStatusChangedHandler(true);
      }
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const logout = () => {
  firebase.auth().signOut();
};

let _onLoginStatusChangedHandler = () => {
  throw new Error(
    "There's no login status change handler. Did you forget to call 'onLoginStatusChange()'?"
  );
};

export const onLoginStatusChange = (onLoginStatusChangedHandler) => {
  const unsubscribeFromInitialLoginCheck = firebase
    .auth()
    .onAuthStateChanged(function initialLoadLoginCheck(user) {
      unsubscribeFromInitialLoginCheck();
      onLoginStatusChangedHandler(!!user);

      firebase.auth().onAuthStateChanged(function logoutCheck(user) {
        if (!user) {
          onLoginStatusChangedHandler(false);
        }
      });
    });

  _onLoginStatusChangedHandler = onLoginStatusChangedHandler;
};
