(function () {
    function SignIn() {
        var firebase = app_firebase;
        var ui = new firebaseui.auth.AuthUI(firebase.auth(),);
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return true;
                },
                uiShown: function () {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: 'NewSellerInfo.html',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            // Terms of service url.
            tosUrl: 'Home.html',
            // Privacy policy url.
            privacyPolicyUrl: 'Home.html'
        };
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                return ui.start('#firebaseui-auth-container', uiConfig);
            });
        firebase.auth().onAuthStateChanged(user => {
            console.log(user);
        });
    }
    SignIn();
})();