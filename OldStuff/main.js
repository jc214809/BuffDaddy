    var client = new Dropbox.Client({
        key: "lu219t3dwuy21ud"
    });
    client.authenticate(function() {
        client.getAccountInfo(function(error, accountInfo) {
            if (error) {
                return showError(error); // Something went wrong.
            }

            //alert("Hello, " + accountInfo.name + "!");
        });
    });


    $(function() {
        $('#ExerciseID').val(guid());
        $("#workout").on("submit", function(event) {
            event.preventDefault();
            client.readFile("hello.txt", function(error, data) {
                if (error) {
                    return showError(error); // Something went wrong.
                }
                var obj = JSON.parse(data);
                obj['activity'].push($("#workout").serializeObject());
                jsonStr = JSON.stringify(obj);

                myFunction2(jsonStr);
            });
        });
    });

    function SignIn() {
        // Try to use cached credentials.
        var client = new Dropbox.Client({
            key: "lu219t3dwuy21ud"
        });
        if (client.isAuthenticated()) {
            alert(client.isAuthenticated());
        } else {
            alert(client.isAuthenticated());
            var result = client.authenticate();

            alert(result);
        }
    }

    function myFunction() {
        var options = {
            files: [{
                'url': 'http://vignette4.wikia.nocookie.net/logopedia/images/0/0b/706.gif/revision/latest?cb=20110724005732',
                'filename': 'Joel.jpg'
            }],

            // Success is called once all files have been successfully added to the user's
            // Dropbox, although they may not have synced to the user's devices yet.
            success: function() {
                // Indicate to the user that the files have been saved.
                alert("Success! Files saved to your Dropbox.");
            },

            // Progress is called periodically to update the application on the progress
            // of the user's downloads. The value passed to this callback is a float
            // between 0 and 1. The progress callback is guaranteed to be called at least
            // once with the value 1.
            progress: function(progress) {},

            // Cancel is called if the user presses the Cancel button or closes the Saver.
            cancel: function() {},

            // Error is called in the event of an unexpected response from the server
            // hosting the files, such as not being able to find a file. This callback is
            // also called if there is an error on Dropbox or if the user is over quota.
            error: function(errorMessage) {}
        };
        //var button = Dropbox.createSaveButton(options);
        //document.getElementById("container").appendChild(button);
        Dropbox.save(options);

        //Dropbox.createSaveButton("http://vignette4.wikia.nocookie.net/logopedia/images/0/0b/706.gif/revision/latest?cb=20110724005732", "reds.jpg", options);
        // var connection = new ActiveXObject("ADODB.Connection");
        // var connectionstring = "Server=sql5.freemysqlhosting.net;Port=3306;Database=sql599959;Uid=sql599959;Pwd=EFBLbvtUCc;";

        // connection.Open(connectionstring);
        // var rs = new ActiveXObject("ADODB.Recordset");

        // rs.Open("SELECT * FROM Workouts", connection);
        // alert("here");

        // rs.close;
        // connection.close;

    }

    function myFunction2(JSONFile) {
        client.writeFile('hello.txt', JSONFile, function() {
            alert('File written!');
        });
    }

    function myFunction3() {
        client.readFile("hello.txt", function(error, data) {
            if (error) {
                return showError(error); // Something went wrong.
            }
            alert(data); // data has the file's contents
        });
    }

    function myFunction4() {
        client.readdir("/", function(error, entries) {
            if (error) {
                return showError(error); // Something went wrong.
            }

            alert("Your Dropbox contains " + entries.join(", "));
        });
    }

    var showError = function(error) {
        switch (error.status) {
            case Dropbox.ApiError.INVALID_TOKEN:
                // If you're using dropbox.js, the only cause behind this error is that
                // the user token expired.
                // Get the user through the authentication flow again.
                break;

            case Dropbox.ApiError.NOT_FOUND:
                // The file or folder you tried to access is not in the user's Dropbox.
                // Handling this error is specific to your application.
                break;

            case Dropbox.ApiError.OVER_QUOTA:
                // The user is over their Dropbox quota.
                // Tell them their Dropbox is full. Refreshing the page won't help.
                break;

            case Dropbox.ApiError.RATE_LIMITED:
                // Too many API requests. Tell the user to try again later.
                // Long-term, optimize your code to use fewer API calls.
                break;

            case Dropbox.ApiError.NETWORK_ERROR:
                // An error occurred at the XMLHttpRequest layer.
                // Most likely, the user's network connection is down.
                // API calls will not succeed until the user gets back online.
                break;

            case Dropbox.ApiError.INVALID_PARAM:
            case Dropbox.ApiError.OAUTH_ERROR:
            case Dropbox.ApiError.INVALID_METHOD:
            default:
                // Caused by a bug in dropbox.js, in your application, or in Dropbox.
                // Tell the user an error occurred, ask them to refresh the page.
        }
    };

    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + s4();
    }
