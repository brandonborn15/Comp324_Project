(function(){
    function Info(){
        var firebase = app_firebase;
        var firestore = app_firestore;
        var user = firebase.auth().currentUser;
        console.log(user);
        const fnameTextField = document.querySelector("#userfname");
        const lnameTextField = document.querySelector("#userlname");
        let emailTextField = '';
        let token = '';
        if(user != null){
            emailTextField = user.email;
            token = user.getIdToken(true);
        }
        const phonenumTextField = document.querySelector("#userphonenum");
        const addressTextField = document.querySelector("#useraddress");
        const saveButton = document.querySelector("#saveButton");

        saveButton.addEventListener("click", function () {
            const fnameToSave = fnameTextField.value;
            const lnameToSave = lnameTextField.value;
            const emailToSave = emailTextField;
            const phonenumToSave = phonenumTextField.value;
            const addressToSave = addressTextField.value;
            console.log("Saving " + fnameToSave + lnameToSave + emailToSave + phonenumToSave + addressToSave);
            const docPath = "/users/"+String(token);
            firebase.firestore().doc(docPath).set({
                address: addressToSave,
                email: emailToSave,
                fname: fnameToSave,
                lname: lnameToSave,
                phonenum: phonenumToSave
            }).then(function () {
                console.log("Save success!");
            }).catch(function (error) {
                console.log("Got an error: ", error);
            })
        })
    }
    Info();
})();
