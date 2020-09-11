<template>
<div id="login">
    <h1>iBid Login</h1>
    <br />
    <div class="row">
        <div class="col-6 offset-md-3">
            <div id="emailForm">
                <label for="email">Please enter your email:</label>
                <br />
                <input type="text" id="email" name="email" class="form-control" />
                <br />
                <button class="btn btn-primary" id="next" @click="checkEmail">Next</button>
            </div>
            <div id="passwordForm">
                <!--        <button @click="forgot">Forgot Password?</button> -->
                <label for="password">Password:</label>
                <input type="text" id="password" name="password" />
                <button class="btn btn-primary" @click="logIn">Log In</button>
            </div>
            <div id="registerForm">
                <div class="row">
                    <div class="col-6">
                        <label for="firstName">First Name:</label>
                        <br />

                        <input type="text" id="fName" name="firstName" class="form-control" />
                    </div>
                    <div class="col-6">
                        <label for="lastName">Last Name:</label>
                        <br />

                        <input type="text" id="lName" name="lastName" class="form-control" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label for="phone">Phone:</label>
                        <br />

                        <input type="number" id="phone" name="phone" class="form-control" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label for="ccnumber">Credit Card Number:</label>
                        <br />

                        <input type="number" id="ccnumber" name="ccnumber" class="form-control" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label for="nameoncard">Name on card:</label>
                        <br />

                        <input type="text" id="nameoncard" name="nameoncard" class="form-control" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label for="expdate">Expiration Date:</label>
                        <br />

                        <input type="month" id="expdate" name="expdate" class="form-control" />
                    </div>
                    <div class="col-6">
                        <label for="cvvcode">CVV Code:</label>
                        <br />

                        <input type="number" id="cvvcode" name="cvvcode" class="form-control" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label for="address">Address:</label>
                        <br />

                        <input type="text" id="address" name="address" class="form-control" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label for="city">City:</label>
                        <br />

                        <input type="text" id="city" name="city" class="form-control" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label for="state">State:</label>
                        <br />

                        <input type="text" id="state" name="state" class="form-control" />
                    </div>
                    <div class="col-6">
                        <label for="zipcode">Zipcode:</label>
                        <br />

                        <input type="number" id="zipcode" name="zipcode" class="form-control" />
                    </div>
                </div>

                <button class="btn btn-primary" @click="registeriBid">Register for iBid</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from "vue";
import sha256 from "crypto-js/sha256";

export default {
    name: "login",
    data() {
        return {
            user: {},
            loggedIn: this.$store.state.user !== undefined | this.$store.state.user == {},
            requestedEvent: this.$store.state.event
        };
    },
    methods: {
        //check for iBid account
        checkEmail() {
            if ($("#email").val() === "") {
                alert("nope!");
                $("#email").style("background-color: red");
            } else {
                $("#next").hide();
                axios
                    .get("https://localhost:5001/api/users/email/" + $("#email").val())
                    .then(response => {
                        // if email is associated with event, show password form
                        // if email is not associated with event, show regsiter form
                        // if email does not exist in database, make them register
                        if (response.data.length > 0) {
                            this.user = response.data[0];
                            this.checkID(this.user.UserID);
                            $("#passwordForm").show();
                        } else {
                            $("#passwordForm").show();

                            $("#registerForm").show();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        // check for Event Registration
        checkID: function (id) {
            axios
                .get("https://localhost:5001/api/users/" + id)
                .then(response => {
                    console.log(response.data[0].G);
                    var events = response.data[0].G.map(x => x.EventID);
                    console.log(events);
                    if (events.contains(this.requestedEvent.EventID)) {
                        console.log("registered for event");
                        //redirect to event
                    } else {
                        console.log("not registered for event");
                        $("#registerEventForm").show();
                    }
                })
                .catch(error => {
                    return error;
                });
        },
        logIn() {
            // use salt to hash password
            var password = $("#password").val();
            var salt = this.user.Salt;
            var hashDigest = sha256(salt + password);
            //hashDigest is array of Bytes , incoming password is hex
            console.log(hashDigest.toString())

            var shortenedPass = hashDigest.toString().substr(0, this.user.Password.length)
            console.log(this.user.Password)
            console.log(shortenedPass)
            // if hashedPassword matches stored hashedPassword then log them in;
            if (shortenedPass == this.user.Password) {
                this.loggedIn = true;
                this.$store.dispatch("logInUser", this.user);
                // check registration for event
                this.checkID(this.user.UserID);

            } else alert("wrong password! try again");
        },
        registeriBid() {
            // if (this.validate())
            {
                var salt = this.createSalt()
                var password = $("#password").val();
                var hashDigest = sha256(salt + password);
                // hashDigest is array of Bytes
                var myData = {
                    email: $("#email").val(),

                    //how to encode array of bytes as string
                    password: hashDigest.toString(),
                    salt: salt,
                    fname: $("#fName").val(),
                    lname: $("#lName").val(),
                    zipcode: $("#zipcode").val(),
                    phone: $("#phone").val()
                };
                console.log(myData);
                $.ajax({
                    type: "POST",
                    async: true,
                    dataType: "json",
                    contentType: "application/json",
                    url: "https://localhost:5001/api/users",
                    data: JSON.stringify(myData),
                    success: function (data) {
                        console.log("Response Data ↓");
                        console.log(data);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            }
        },
        createSalt() {
            var salt = "";
            var selection = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (var i = 1; i <= 30; i++) {
                salt += selection.charAt(
                    Math.floor(Math.random() * selection.length)
                );
            }
            return salt
        },
        validate() {
            if ($("#phone").val().length < 10 || $("#ccnumber").val().length < 16) {
                if ($("#phone").val().length < 10) {
                    $("#phone").css({
                        "background-color": "#ffcccb"
                    });
                    alert("please enter a mobile phone number with ten or more numbers");
                }
                if ($("#ccnumber").val().length < 16) {
                    $("#ccnumber").css({
                        "background-color": "#ffcccb"
                    });
                    alert("please enter a valid credit card number");
                }
                return false;
            } else return true;
        },
        // ascii_to_hexa(str) {
        //     var arr1 = [];
        //     for (var n = 0, l = str.length; n < l; n++) {
        //         var hex = Number(str.charCodeAt(n)).toString(8);
        //         arr1.push(hex);
        //     }
        //     return arr1.join("");
        // },
        string2bytes(str) {
            var bytes = [];

            for (var i = 0; i < str.length; ++i) {
                bytes.push(str.charCodeAt(i));
            }
            return bytes;
        },
    },

    mounted() {
        $("#passwordForm").hide();
        $("#registerForm").hide();
        $("#registerEvent").hide();
        $("#emailForm").hide();

        if (this.loggedIn) {
            console.log("user is logged in");
        } else {
            $("#emailForm").show();
        }
    }

};
</script>

<style scoped>
#login {
    padding-top: 100px;
    width: 100%;
    align-content: center;
    text-align: center;
}

input {
    width: 100%;
    margin-bottom: 10px;
}

label {
    float: left;
}
</style>
