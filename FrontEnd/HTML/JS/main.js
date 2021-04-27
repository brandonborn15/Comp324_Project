var mainApp = {};
var setInfo = {};
var signIn = {};
var setUser = {};
var getInfo = {};
var createItem = {};
(function(){
    var firebase = app_firebase;
    var firestore = app_firestore;
    var storageRef = firebase.storage().ref();
    var thisuser = "";
    var uid;
    var userStorageRef;
    function SignUserIn() {
        console.log("signing in");
        var ui = new firebaseui.auth.AuthUI(firebase.auth(),);
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    if(authResult != null){
                        window.location.assign("SellersHome.html")
                    }else {
                        window.location.assign("NewSellerInfo.html")
                    }
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return false;
                },
                uiShown: function () {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: 'SellerHome.html',
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
                ui.start('#firebaseui-auth-container', uiConfig);
            });
    }
    function SetUser(user){
        thisuser = user;
        userStorageRef = storageRef.child(String(user.uid));
        return thisuser;
    }
    function logOut(){
        firebase.auth().signOut()
    }
    function SetInfo(){
        var emailTextField;
        var token;
        console.log("lets log some info");

        firebase.auth().onAuthStateChanged(user => {
            console.log(SetUser(user));
            if(thisuser != null){
                emailTextField = thisuser.email;
                uid = thisuser.uid;
            }else{
                window.location.replace("SignIn.html")
            }
        });

        const fnameTextField = document.querySelector("#userfname");
        const lnameTextField = document.querySelector("#userlname");
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
            const docPath = "/users/"+String(uid);
            firebase.firestore().doc(docPath).set({
                address: addressToSave,
                email: emailToSave,
                fname: fnameToSave,
                lname: lnameToSave,
                phonenum: phonenumToSave
            }).then(function () {
                console.log("Save success!");
                window.location.replace("SellersHome.html");
            }).catch(function (error) {
                console.log("Got an error: ", error);
            })
        })
    }
    function GetInfo(){
        console.log("getting info");
        firebase.auth().onAuthStateChanged(user => {
            console.log(SetUser(user));
            if(thisuser != null){
                console.log("setting uid");
                uid = thisuser.uid;
                const docPath = "/users/"+String(uid);
                console.log(docPath);
                var docRef= firebase.firestore().doc(docPath);
                console.log(docRef);
                const fnameOutField = document.querySelector("#userfnameout");
                const lnameOutField = document.querySelector("#userlnameout");
                const phonenumOutField = document.querySelector("#userphonenumout");
                const addressOutField = document.querySelector("#useraddressout");
                docRef.get().then(function(doc){
                    if(doc && doc.exists){
                        console.log("doc exists");
                        const myData = doc.data();
                        fnameOutField.innerText = "Current First Name: " + myData.fname;
                        lnameOutField.innerText = "Current Last Name: " + myData.lname;
                        phonenumOutField.innerText = "Current Phone Number: " + myData.phonenum;
                        addressOutField.innerText = "Current Address: " + myData.address;
                    }else{
                        fnameOutField.innerText = "Enter Your Contact First  Name: ";
                        lnameOutField.innerText = "Enter Your Contact Last Name: ";
                        phonenumOutField.innerText = "Enter Your Contact Phone Number: ";
                        addressOutField.innerText = "Enter Your Current Address: ";
                    }
                });
            }else{
                window.location.replace("SignIn.html")
            }
        });
    }
    function CreateItem(){
        console.log("creating item");
        const colPath = "";

        firebase.auth().onAuthStateChanged(user => {
            console.log(SetUser(user));
            if(thisuser != null){
                uid = thisuser.uid;
            }else{
                window.location.replace("SignIn.html")
            }
        });

        const itemTitleTextField = document.querySelector("#itemtitle");
        const itemDescriptionTextField = document.querySelector("#itemdescription");
        const itemPriceNumberField = document.querySelector("#itemprice");
        const imageUploadField = document.getElementById("imageupload");
        console.log(imageUploadField);
        const saveItemButtonField = document.querySelector("#saveItemButton");

        function setCategory(){
            var ele = document.getElementsByName('category');
            for(i = 0; i < ele.length; i++) {
                if(ele[i].checked)
                    return ele[i].value;
            }
        }
        function UploadImage(imageRefToUpload){
            var imageToUpload = imageUploadField.files[0];
            console.log("image uploaded")
            userFileStorageRef = userStorageRef.child(imageRefToUpload);
            userFileStorageRef.put(imageToUpload)
            console.log(imageToUpload);
        }
        saveItemButtonField.addEventListener("click", function () {
            const titleToSave = itemTitleTextField.value;
            const descToSave =itemDescriptionTextField.value;
            const priceToSave = itemPriceNumberField.value;
            const catToSave = setCategory();
            const imageRefToUpload = String(imageUploadField.value).slice(12);
            const docPath = "/users/"+ String(uid) + "/items";

            firebase.firestore().collection(docPath).add({
                title: titleToSave,
                description: descToSave,
                price: priceToSave,
                category: catToSave,
                imageref: imageRefToUpload,
                soldflag: false
            });
            UploadImage(imageRefToUpload);
            console.log("item created successfully")
        });
    }
    createItem.CreateItem = CreateItem;
    mainApp.logOut = logOut;
    setInfo.SetInfo = SetInfo;
    signIn.SignUserIn = SignUserIn;
    setUser.SetUser = SetUser;
    getInfo.GetInfo = GetInfo;
})();