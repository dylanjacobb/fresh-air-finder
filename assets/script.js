function getState() {
    var states = $('#state-code');
    fetch('https://developer.nps.gov/api/v1/parks?stateCode=' + states.val() + '&api_key=qQvruAIuR9oGS2ih7yXB2P0YKf17frx4oM1QnVuC')
    .then(function(response) {
        return response.json();
    })
    .then(function(parks) {
        console.log(parks);
        console.log(parks.data[0].name);
        $('#parks-list').empty();
        for(var i = 0; i < parks.data.length; i++) {
            $('#parks-list').append('<li>' + '<a class="parkBtn">' + parks.data[i].fullName + '</a>' + '</li>')
    }
})
};



$('#searchBtn').on('click', function(e) {
    e.preventDefault();
    getState();
})