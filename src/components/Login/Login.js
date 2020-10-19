import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.confiq';
import { UserContext } from '../../App';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {

        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }

        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            const { displayName, email } = result.user;
            const signInUser = { name: displayName, email };
            setLoggedInUser(signInUser);
            history.replace(from);

        }).catch(function (error) {
            var errorMessage = error.message;
            console.log(errorMessage);

        });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign in</button>
        </div>
    );
};

export default Login;