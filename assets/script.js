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
        tile(parksData)
    }
)
};

function li(parksData) {
$('#parks-list').empty();
for(var i = 0; i < parksData.length; i++) {
    $('#parks-list').append('<li>' + '<a class="parkBtn" id="parkButton' + [i] + '">' + parksData[i].fullName + '</a>' + '</li>')
}
}
// Fill tiles with park info
function tile(parksData) {
    for(var i = 0; i < parksData.length; i++) {
        $('img').attr('src', parksData[i].images[0].url)
    }
}


$(".parkBtn").on("click", function () {
    $(this).attr("id").split("parkButton")[1]
    console.log(this);
    tile(parksData)
});


$('select').change(function(e) {
    e.preventDefault();
    getState();
})


// var userInput = $("#" + clickedHour).val().trim()
// if (userInput) {
    // localStorage.setItem("hour" + clickedHour, userInput)
// }