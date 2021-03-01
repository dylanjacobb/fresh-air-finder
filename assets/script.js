var loadHistory = JSON.parse(localStorage.getItem('state')) || [];

function getState(state) {
    fetch('https://developer.nps.gov/api/v1/parks?stateCode=' + state + '&api_key=qQvruAIuR9oGS2ih7yXB2P0YKf17frx4oM1QnVuC')
        .then(function (response) {
            return response.json();
        })
        .then(function (parks) {
            console.log(parks);
            console.log(parks.data[0].name);
            var parksData = parks.data;
            createList(parksData);
            console.log(parks.data[0].description)
            if (!loadHistory.includes(state)) {
                loadHistory.push(state);
                localStorage.setItem('state', JSON.stringify(loadHistory));
                renderHistory();
            } 
        })
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
        if(park.images.length){    
        button.data('image', park.images[0].url);
        } else {
            button.data('image', 'data:image/jpeg;base64,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');
        }
        if(park.fullName.length) {
        button.data('title', park.fullName);
        } else {

        }
        if(park.description) {
        button.data('description', park.description);
        } else {

        }
        if(park.contacts.length) {
        button.data('phone', 'Phone Number: ' + park.contacts.phoneNumbers[0].phoneNumber);
        } else {

        }
        if(park.url) {
        button.data('link', park.url);
        } else {

        }
        if(park.addresses.length) {
        button.data('city', park.addresses[0].postalCode.split('-')[0]);
        button.data('address', 'Address: ' + JSON.stringify(park.addresses[0].line1 + ', ' + park.addresses[0].city + ', ' + park.addresses[0].stateCode + ' ' + park.addresses[0].postalCode));
        } else {
            
        }
        li.append(button);
        items.append(li);
    }
    $('#parks-list').html(items);

}

function renderHistory() {
if (loadHistory !== null) {
    var newDiv = $('<div>').addClass('divHistory');
    for (var j = 0; j < loadHistory.length; j++) {
        var historyButtons = $('<a>');
        historyButtons.text(loadHistory[j].toUpperCase());
        historyButtons.attr('class', 'button historyBtn');
        newDiv.append(historyButtons);
    }
    $('#history').html(newDiv);
}}
renderHistory();

$('#history').on('click', '.historyBtn', function () {
    var state = $(this).text();
    getState(state);
})

$('.reset').on('click', function(){
    localStorage.clear();
    window.location.reload();
})

$("#parks-list").on("click", '.parkBtn', function () {
    $('img').attr('src', $(this).data('image'));
    $('.parkTitle').text($(this).data('title'));
    $('.parkDescription').text($(this).data('description'));
    $('#address').text($(this).data('address'));
    $('#phoneNumber').text($(this).data('phone'));
    $('#webSite').attr('href', $(this).data('link')).text('Go To The Website');
    if ($(this).data('city')) {
        getWeather($(this).data('city'))
        } else {
            $('.weatherBtn').attr(' disabled');
        };
})


$('select').change(function () {
    getState($('#state-code').val());
})

$('#parks-list').on('click', '.weatherBtn', function () {
    $('.modal').addClass("is-active");
    if ($(this).data('city')) {
        getWeather($(this).data('city'))
        } else {
            $('.weatherBtn').attr(' disabled');
            $('.modal').removeClass("is-active");  
        };
    console.log("clicked")
})

$('#closeModal').on('click', function () {
    $('.modal').removeClass("is-active");
})

