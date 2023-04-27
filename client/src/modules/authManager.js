import firebase from "firebase/app";
import "firebase/auth";
import { getParameters } from "../helpers/apiHelpers";

const userProfileUrl = "/api/userprofile";

export const getToken = () => firebase.auth().currentUser.getIdToken();

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
      `${userProfileUrl}/DoesUserExist${firebaseUserId}`,
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

export const onLoginStatusChange = (onLoginStatusChangeHandler) => {
  firebase.auth().onAuthStateChanged((user) => {
    onLoginStatusChangeHandler(!!user);
  });
};
