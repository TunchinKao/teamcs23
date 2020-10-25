let PROFILE = null;

window.onload = function() {
    const useNodeJS = true;   // if you are not using a node server, set this value to false
    const defaultLiffId = "";   // change the default LIFF value if you are not using a node server

    // DO NOT CHANGE THIS
    let myLiffId = "";

    // if node is used, fetch the environment variable and pass it to the LIFF method
    // otherwise, pass defaultLiffId
    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {
                alert(error)
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
    console.log("ready");
};

/**
* Check if myLiffId is null. If null do not initiate liff.
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiffOrDie(myLiffId) {
    if (myLiffId) {
        initializeLiff(myLiffId);
    } else {
        console.error('please set your liff Id in application!')
    }
}

/**
* Initialize LIFF
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            initializeApp();
        })
        .catch((err) => {
            console.log(err)
        });
}

/**
 * Initialize the app by calling functions handling individual app components
 */
function initializeApp() {
    displayIsInClientInfo();
    registerButtonHandlers();
    // check if the user is logged in/out, and disable inappropriate button
    if (liff.isLoggedIn()) {
        displayLiffData();
        document.getElementById('liffLoginButton').disabled = true;
        document.getElementById("PersonPage").classList.visibility="visible";
        
        document.getElementById("selector").classList.visibility="visible";
    } else {
        document.getElementById('liffLogoutButton').disabled = true;
        document.getElementById('shareMeTargetPicker').disabled = true;
        document.getElementById('shareMyRequireTargetPicker').disabled = true;
        document.getElementById('shareMyOptimalTargetPicker').disabled = true;
        document.getElementById('shareMyCurrentCircleTargetPicker').disabled = true;
        document.getElementById("PersonPage").classList.visibility="hidden";
        
        document.getElementById("selector").classList.visibility="hidden";
        // document.getElementById('PersonPage').disabled = true;
        // document.getElementsByClassName('campaign card mb-4 shadow-sm').disabled = true;
        
    }
}

/**
* Display data generated by invoking LIFF methods
*/
function displayLiffData() {
    liff.getProfile()
    .then((result) => {
        PROFILE = result;
        document.getElementById('profileName').textContent = 'Hi, ' + result.displayName;
    })
    document.getElementById('isInClient').textContent = liff.isInClient();
    document.getElementById('isLoggedIn').textContent = liff.isLoggedIn();
}

/**
* Toggle the login/logout buttons based on the isInClient status, and display a message accordingly
*/
function displayIsInClientInfo() {
    if (liff.isInClient()) {
        document.getElementById('liffLoginButton').classList.toggle('hidden');
        document.getElementById('liffLogoutButton').classList.toggle('hidden');
        document.getElementById('isInClient').textContent = 'You are opening the app in the in-app browser of LINE.';
        
        document.getElementById('PersonPage').classList.visibility="visible";
        
        document.getElementById('selector').classList.visibility="visible";
        
    } else {
        document.getElementById('shareMeTargetPicker').classList.toggle('hidden');
        document.getElementById('shareMyRequireTargetPicker').classList.toggle('hidden');
        document.getElementById('shareMyOptimalTargetPicker').classList.toggle('hidden');
        document.getElementById('shareMyCurrentCircleTargetPicker').classList.toggle('hidden');
        
        document.getElementById('PersonPage').classList.visibility="hidden";
        
        document.getElementById('selector').classList.visibility="hidden";
        // document.getElementById('PersonPage').classList.toggle('hidden');
        // document.getElementsById('PersonPage').
        // document.getElementsByClassName('campaign card mb-4 shadow-sm').classList.toggle('hidden');
        
    }
}

/**
* Register event handlers for the buttons displayed in the app
*/
function registerButtonHandlers() {
    document.getElementById('shareMeTargetPicker').addEventListener('click', function () {
        if (liff.isApiAvailable('shareTargetPicker')) {
            liff.shareTargetPicker([{
                'type': 'text',
                'text': 'Hello, I am ' + PROFILE.displayName
            }, {
                'type': 'image',
                'originalContentUrl': PROFILE.pictureUrl,
                'previewImageUrl': PROFILE.pictureUrl
            }]).then(function (res) {
                if (res) alert('Message sent!');
            }).catch(function (res) {
                console.error(res);
            });
        }
    });
    document.getElementById('shareMyCurrentCircleTargetPicker').addEventListener('click', function () {
        const imageUrl = document.getElementById('placeImage').src;
        const name = document.getElementById('campaignName').textContent || ' ';
        const place = document.getElementById('campaignPlace').textContent || ' ';
        const time = document.getElementById('campaignTime').textContent || ' ';
        
        if (liff.isApiAvailable('shareTargetPicker')) {
            liff.shareTargetPicker([{
                'type': 'text',
                'text': 'Hey! Check out' + PROFILE.displayName +  'My Current Studying fields'
            }, {
                'type': 'flex',
                'altText': name,
                'contents': {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "url": imageUrl,
                        "size": "full",
                        "aspectRatio": "20:13",
                        "aspectMode": "cover",
                        "action": {
                            "type": "uri",
                            "uri": liff.permanentLink.createUrl()
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": name,
                                "weight": "bold",
                                "size": "xl"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "margin": "lg",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "Place",
                                                "color": "#aaaaaa",
                                                "size": "sm",
                                                "flex": 1
                                            },
                                            {
                                                "type": "text",
                                                "text": place,
                                                "wrap": true,
                                                "color": "#666666",
                                                "size": "sm",
                                                "flex": 5
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "Time",
                                                "color": "#aaaaaa",
                                                "size": "sm",
                                                "flex": 1
                                            },
                                            {
                                                "type": "text",
                                                "text": time,
                                                "wrap": true,
                                                "color": "#666666",
                                                "size": "sm",
                                                "flex": 5
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    "footer": {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "sm",
                        "contents": [
                            {
                                "type": "spacer",
                                "size": "sm"
                            }
                        ],
                        "flex": 0
                    }
                }
            }
        ]).then(function (res) {
                if (res) alert('Circle Graph sent!');
            }).catch(function (res) {
                console.error(res);
            });
        }}
    );
    document.getElementById('shareMyRequireTargetPicker').addEventListener('click', function(){
        // var reqnumber = 1;
        fetch('/requireCourseList').then(function(res){
            return res.json();
        }).then(function(res) {
            console.log('asking for /requireCourseList');
            // console.log('[res]', res);  
            
            var message = "";
            // console.log('[res.length]', res.length);
            var count = res['list'].length;
            console.log('[count]', count);
            for(var index = 0; index < count; index++){
                
                message += res['list'][index];
                message +='\n';
            }
            console.log('[message]', message);

            if (liff.isApiAvailable('shareTargetPicker')) {
                liff.shareTargetPicker([{
                    'type': 'text',
                    'text': message
                }]).then(function (res) {
                    if (res) alert('Message sent!');
                }).catch(function (res) {
                    console.error(res);
                });
            }
        }).catch(function(err){
            console.log(err);
        });
    });
    document.getElementById('shareMyOptimalTargetPicker').addEventListener('click', function(){
        // var reqnumber = 1;
        fetch('/optimalCourseList').then(function(res){
            return res.json();
        }).then(function(res) {
            console.log('asking for /optimalCourseList');
            // console.log('[res]', res);  
            
            var message = "";
            // console.log('[res.length]', res.length);
            var count = res['list'].length;
            console.log('[count]', count);
            for(var index = 0; index < count; index++){
                
                message += res['list'][index];
                
                message+='\n';
            }
            console.log('[message]', message);

            if (liff.isApiAvailable('shareTargetPicker')) {
                liff.shareTargetPicker([{
                    'type': 'text',
                    'text': message
                }]).then(function (res) {
                    if (res) alert('Message sent!');
                }).catch(function (res) {
                    console.error(res);
                });
            }
        }).catch(function(err){
            console.log(err);
        });
    });
    // document.getElementById('shareMyCourseTargetPicker').addEventListener('click', function () {
    //     if (liff.isApiAvailable('shareTargetPicker')) {
    //         liff.shareTargetPicker([{
    //             'type': 'text',
    //             'text': 'Hello, This semester ' + PROFILE.displayName + ' has selected following Course'
    //         }
    //     ]).then(function (res) {
    //             if (res) alert('Course Message sent!');
    //         }).catch(function (res) {
    //             console.error(res);
    //         });
    //     }
    // });
    // login call, only when external browser is used
    document.getElementById('liffLoginButton').addEventListener('click', function() {
        if (!liff.isLoggedIn()) {
            liff.login();      
        }
    });
    

    // logout call only when external browse
    document.getElementById('liffLogoutButton').addEventListener('click', function() {
        if (liff.isLoggedIn()) {
            liff.logout();
            window.location.reload();
        }
    });
}

/**
* Toggle specified element
* @param {string} elementId The ID of the selected element
*/
function toggleElement(elementId) {
    const elem = document.getElementById(elementId);
    if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
        elem.style.display = 'none';
    } else {
        elem.style.display = 'block';
    }
}
