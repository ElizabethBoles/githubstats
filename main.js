let fetch = require('node-fetch');
console.log( process.argv[2] );

let promise = fetch(
    'https://api.github.com/users/jakerella',
    {
        method: 'GET',
        headers: {
            Authorization: 'token ' + process.argv[2]
        },
        body: '...'  // POST (creating data) or PATCH (updating)
    }
);

promise.then( function handleResponse(responseObj) {
    console.log( responseObj.status );

    if (responseObj.status > 199 && responseObj.status < 300) {
        // In here, I know the request was successful

        responseObj.json().then( function printData(myUserData) {
            console.log( myUserData.name, myUserData.location );
            //put the . to target the name and location after the iterm print out


        } );

    } else {
        // Now I know there was a problem
        // Maybe we should tell the user!!
        console.log( 'There was a problem', responseObj.status );
    }

});
