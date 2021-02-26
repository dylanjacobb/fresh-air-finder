function getState() {
    var states = $('#state-code');
    fetch('https://developer.nps.gov/api/v1/parks?stateCode=' + states.val() + '&api_key=qQvruAIuR9oGS2ih7yXB2P0YKf17frx4oM1QnVuC')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
};

$('#searchBtn').on('click', function(e) {
    e.preventDefault();
    getState();
})