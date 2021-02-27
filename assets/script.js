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
        // tile(parksData)
        $(".parkBtn").on("click", function(e){
            e.preventDefault();
            var idClicked = e.target.id;
            console.log(idClicked);
            num = idClicked.split("parkButton")[1];
            console.log(num);
            $('img').attr('src', parksData[num].images[0].url)
            $('.parkTitle').text(parksData[num].fullName)
            $('.parkDescription').text(parksData[num].description)
            $('#address').text('Address: ' + JSON.stringify(parks.data[num].addresses[0].line1 + ', ' + parks.data[num].addresses[0].city + ', ' + parks.data[num].addresses[0].stateCode + ' ' + parks.data[num].addresses[0].postalCode));
            $('#phoneNumber').text('Phone Number: ' + parks.data[0].contacts.phoneNumbers[0].phoneNumber);
            $('#webSite').attr('href', parks.data[0].url).text('Go To The Website');
            var cityName = parks.data[num].addresses[0].city;
            getWeather(cityName);
        });
    }
)
};

function getWeather(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=89104d923bea4d5ae43cfd42a60778d4&units=imperial')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
}



function li(parksData) {
$('#parks-list').empty();
$('#parks-list').unbind();
for(var i = 0; i < parksData.length; i++) {
    $('#parks-list').append('<li ><button type="button" class="parkBtn is-8" id="parkButton' + [i] + '">' + parksData[i].fullName + '</button>' + '</li>')
}
}

 
    $('select').change(function(e) {
    e.preventDefault();
    getState();
})


// var userInput = $("#" + clickedHour).val().trim()
// if (userInput) {
    // localStorage.setItem("hour" + clickedHour, userInput)
// }