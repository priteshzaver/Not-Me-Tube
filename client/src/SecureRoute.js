import firebase from "firebase/app";
import "firebase/auth";
import { useNavigate } from "react-router-dom";

export const SecureRoute = ({ route }) => {
    const navigate = useNavigate()
    const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    return route
  } else {
    navigate("/login")
  }
}