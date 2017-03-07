

let fetch = require('node-fetch');
let userName = process.argv[2];
let promise = fetch(
    'https://api.github.com/users/' + userName,
    {
        method: 'GET',
        headers: {
            Authorization: 'token ' + process.argv[3]
        }
    }
);

promise.then( function handleResponse(responseObj) {
    //console.log( responseObj.status );

    if (responseObj.status > 199 && responseObj.status < 300) {

        responseObj.json().then(function printData(myUserData) {
            console.log( myUserData.name, myUserData.location );
            //put the . to target the name and location after the iterm print out
        });

    } else {
        console.log( 'There was a problem', responseObj.status );
    }
     });
//-----------------------------------------------------------------------------
let promise2 = fetch(
    'https://api.github.com/users/' + userName + '/repos',
    {
        method: 'GET',
        headers: {
            Authorization: 'token ' + process.argv[3]
        }
    }
);

promise2.then( function repoResponse(response) {
    //console.log(response.status);

    if(response.status > 199 && response.status < 300) {
      response.json().then(function printData(reposData) {


        let totalStarCount;
        let totalStarCountNumber = 0;
        //established my variables that are empty

        reposData.forEach( function retrievesCount(repository) {
          //console.log(repository.stargazers_count, repository.name);
          if (repository.stargazers_count > totalStarCountNumber) {
            totalStarCount = repository.name;
            totalStarCountNumber = repository.stargazers_count;
          }
        });

        console.log(totalStarCount);

      });
    } else {
      console.log( 'There was a problem', response.status );
    }
});
//-----------------------------------------------------------------------------
