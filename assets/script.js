var loadHistory = JSON.parse(localStorage.getItem('state')) || [];

function getState() {
    var states = $('#state-code');
    fetch('https://developer.nps.gov/api/v1/parks?stateCode=' + states.val() + '&api_key=qQvruAIuR9oGS2ih7yXB2P0YKf17frx4oM1QnVuC')
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
                loadHistory.push(states.val());
                localStorage.setItem('state', JSON.stringify(loadHistory));
            } else {
                loadHistory.push(states.val());
                localStorage.setItem('state', JSON.stringify(loadHistory));
            }
        }
        )
};

function getWeather(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=89104d923bea4d5ae43cfd42a60778d4&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (weather) {
            console.log(weather);
            $('.modal-card-body').empty();
            weather.list.forEach(function (weatherObject) {
                if (moment.unix(weatherObject.dt).format("H") === "13") {
                    console.log(weatherObject.main.temp);
                    createCard(weatherObject);
                }

            })
        })
};

function createCard(weatherObject) {

    var day = $('<h2>').text(moment.unix(weatherObject.dt).format("ddd-MMM Do"));
    var temp = $('<h6>').text("Temp: " + weatherObject.main.temp + "F");
    var wind = $('<h6>').text("Wind: " + weatherObject.wind.speed + "mph");
    var humid = $('<h6>').text("Humidity: " + weatherObject.main.humidity + "%");
    var icon = "<img src=http://openweathermap.org/img/w/" + weatherObject.weather[0].icon + ".png />"
    var cardBody = $('<div>').addClass('card card-content content wrap');
    var messageBad = $('<h2>').text("Maybe Tomorrow").css("color", "red")
    var messageEh = $('<h2>').text("Cloudy but Dry").css("color", "orange")
    var messageGood = $('<h2>').text("Fresh Air!").css("color", "green")
    if (weatherObject.weather[0].id === 800) {
        cardBody.append(messageGood)
    } else if (weatherObject.weather[0].id > 800) {
        cardBody.append(messageEh) 
    } else {
        cardBody.append(messageBad)
    }
    $('.modal-card-body').append(cardBody.append(day, temp, wind, humid, icon));


}


function createList(parksData) {
    var items = $('<ul id="parks-list-items">');
    for (var i = 0; i < parksData.length; i++) {
        var park = parksData[i];
        var li = $('<li>');
        var button = $('<button type="button" class="parkBtn is-8">' + park.fullName + '</button>'
            + "     " + '<button type="button" class="weatherBtn">Get Weather</button>');
        button.data('image', park.images[0].url);
        button.data('title', park.fullName);
        button.data('description', park.description);
        button.data('phone', 'Phone Number: ' + park.contacts.phoneNumbers[0].phoneNumber);
        button.data('link', park.url);
        button.data('city', park.addresses[0].postalCode);
        button.data('address', 'Address: ' + JSON.stringify(park.addresses[0].line1 + ', ' + park.addresses[0].city + ', ' + park.addresses[0].stateCode + ' ' + park.addresses[0].postalCode));
        li.append(button);
        items.append(li);
    }
    $('#parks-list').html(items);

}

if (loadHistory !== null) {
    for (var j = 0; j < loadHistory.length; j++) {
        var historyButtons = $('<a>');
        historyButtons.text(loadHistory[j].toUpperCase());
        historyButtons.attr('class', 'button historyBtn');
        $('#history').append(historyButtons);
    }
}

$('#history').on('click', '.historyBtn', function (e) {
    e.preventDefault();
})

$("#parks-list").on("click", '.parkBtn', function () {
    $('img').attr('src', $(this).data('image'));
    $('.parkTitle').text($(this).data('title'));
    $('.parkDescription').text($(this).data('description'));
    $('#address').text($(this).data('address'));
    $('#phoneNumber').text($(this).data('phone'));
    $('#webSite').attr('href', $(this).data('link')).text('Go To The Website');
    getWeather($(this).data('city'));
})


$('select').change(function (e) {
    e.preventDefault();
    getState();
})

$('#parks-list').on('click', '.weatherBtn', function () {
    $('.modal').addClass("is-active");
    getWeather($(this).data('city'));
    console.log("clicked")
})

$('#closeModal').on('click', function () {
    $('.modal').removeClass("is-active");
})

