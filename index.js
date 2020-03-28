'use strict';

const searchURL = 'https://api.github.com/users/';
//Need to change endpoint to (username)/repos

function getRepos(newLink) {
    console.log(searchURL);
    fetch(newLink)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });

}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    console.log(responseJson.length);
    for (let i=0; i < responseJson.length; i++){
        $('#results-list').append(`
        <li><h3><a href='${responseJson[i].html_url}'>${responseJson[i].name}
        </a></h3></li>
        `);
    }
    $('#results').removeClass('hidden');
}

function newURL(username) {
    return searchURL + `${username}/repos`;
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const username = $('#js-search-term').val();
        let newLink = newURL(username);
        console.log(newLink);
        getRepos(newLink);
    });
}

$(watchForm);