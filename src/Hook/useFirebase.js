import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile, getIdToken } from "firebase/auth";
import firebaseInitialization from "../Pages/Login/firebase/firebase.init";

firebaseInitialization();

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const [admin, setAdmin] = useState(false);

    console.log(admin);



    const registerUser = (email, password, name, location, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                history.replace(destination);
                const newUser = { email, displayName: name }
                setUser(newUser)
                saveUser(email, name, 'POST');
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {

                }).catch((error) => {

                });
                setError('');
                // history.replace('/')

            })
            .catch((error) => {

                const errorMessage = error.message;
                setError(errorMessage);

            })
            .finally(() => setIsLoading(false));

    }

    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                history.replace(destination);
                // Signed in 
                setError('');

            })
            .catch((error) => {

                const errorMessage = error.message;
                setError(errorMessage);
            })
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        setTimeout(() => {
            setError("");
        }, 5000);
    }, [error]);

    //google signIn
    const signInWithGoogle = (location, history) => {
        setIsLoading(true);


        signInWithPopup(auth, googleProvider)
            .then((result) => {
                console.log('google sign in is clicked');
                const destination = location?.state?.from || '/';
                history.replace(destination);
                const user = result.user;
                saveUser(user.email, user.displayName, 'PUT')
                setError('');

            }).catch((error) => {

                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {

            if (user) {
                console.log(user);
                setUser(user)
                // getIdToken(user)
                // .then(idToken=>{
                //     setToken(idToken);
                //     console.log(idToken);
                // })

            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    }, [])


    useEffect(() => {
        fetch(`https://dream-rider-server.vercel.app/uniqueUser/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user.email])





    const logout = () => {
        setIsLoading(true)
        signOut(auth).then(() => {
            console.log('logout is clicked');

        }).catch((error) => {
            setError(error.message)
        })
            .finally(() => setIsLoading(false));
    }

    const saveUser = (email, displayName, method) => {

        const user = { email, displayName }

        fetch('https://dream-rider-server.vercel.app/uniqueUser', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {

            })
    }
    return {
        user,
        admin,
        registerUser,
        loginUser,
        signInWithGoogle,
        error,
        logout,
        isLoading,

    };
};

export default useFirebase;