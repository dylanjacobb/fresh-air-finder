var loadHistory = JSON.parse(localStorage.getItem('state')) || [];

function getState() {
    var states = $('#state-code');
    fetch('https://developer.nps.gov/api/v1/parks?stateCode=' + states.val() + '&api_key=qQvruAIuR9oGS2ih7yXB2P0YKf17frx4oM1QnVuC')
<<<<<<< HEAD
        .then(function (response) {
            return response.json();
        })
        .then(function (parks) {
            console.log(parks);
            console.log(parks.data[0].name);
            var parksData = parks.data;
            createList(parksData);
            console.log(parks.data[0].description)
            if (loadHistory === null) {
                loadHistory.push($('#state-code').val());
                localStorage.setItem('state', JSON.stringify(loadHistory));
            } else {
                loadHistory.push($('#state-code').val());
                localStorage.setItem('state', JSON.stringify(loadHistory));
            }
        }
        )
=======
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
            $('.modal').addClass('is-active')
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
>>>>>>> main
};

function getWeather(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=89104d923bea4d5ae43cfd42a60778d4&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}

function createList(parksData) {
    var items = $('<ul id="parks-list-items">');
    for (var i = 0; i < parksData.length; i++) {
        var park = parksData[i];
        var li = $('<li>');
        var button = $('<button type="button" class="parkBtn is-8">' + park.fullName + '</button>');
        var cityName = park.addresses[0].postalCode;
        button.data('image', park.images[0].url);
        button.data('title', park.fullName);
        button.data('description', park.description);
        button.data('phone', 'Phone Number: ' + park.contacts.phoneNumbers[0].phoneNumber);
        button.data('link', park.url);
        button.data('city', park.addresses[0].city);
        // button.data('postal', park.addresses[0].postalCode);
        button.data('address', 'Address: ' + JSON.stringify(park.addresses[0].line1 + ', ' + park.addresses[0].city + ', ' + park.addresses[0].stateCode + ' ' + park.addresses[0].postalCode));
        li.append(button);
        items.append(li);
    }
    getWeather(cityName);
    $('#parks-list').html(items);  
    
}

if (loadHistory !== null) {
    for (var j = 0; j < loadHistory.length; j++) {
        var historyButtons = $('<a>' + '</a>')
        historyButtons.text(loadHistory[j].toUpperCase());
        $('#history').append(historyButtons);
    }
}

<<<<<<< HEAD
$("#parks-list").on("click", '.parkBtn', function () {
    $('.modal').addClass('is-active')
    $('img').attr('src', $(this).data('image'));
    $('.parkTitle').text($(this).data('title'));
    $('.parkDescription').text($(this).data('description'));
    $('#address').text($(this).data('address'));
    $('#phoneNumber').text($(this).data('phone'));
    $('#webSite').attr('href', $(this).data('link')).text('Go To The Website');
    getWeather($(this).data('city'));
})


$('select').change(function (e) {
=======
 
$('select').change(function(e) {
>>>>>>> main
    e.preventDefault();
    getState();
})

$('#closeModal').on('click', function() {
    $('.modal').removeClass("is-active");
})
<<<<<<< HEAD
=======

// var userInput = $("#" + clickedHour).val().trim()
// if (userInput) {
    // localStorage.setItem("hour" + clickedHour, userInput)
// }
>>>>>>> main
