function getState() {
    var states = $('#state-code');
    fetch('https://developer.nps.gov/api/v1/parks?stateCode=' + states.val() + '&api_key=qQvruAIuR9oGS2ih7yXB2P0YKf17frx4oM1QnVuC')
    .then(function(response) {
        return response.json();
    })
    .then(function(parks) {
        console.log(parks);
        console.log(parks.data[0].name);
        var parksData = parks.data;
        li(parksData);
        console.log(parks.data[0].description)
    }

)
};

function li(parksData) {
$('#parks-list').empty();
for(var i = 0; i < parksData.length; i++) {
    $('#parks-list').append('<li>' + '<a class="parkBtn">' + parksData[i].fullName + '</a>' + '</li>')
    }
}


$('select').change(function(e) {
    e.preventDefault();
    getState();
})
 
