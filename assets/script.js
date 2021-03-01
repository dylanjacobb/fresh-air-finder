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

function getWeather(postalCode) {
    console.log(postalCode);
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + postalCode + '&appid=89104d923bea4d5ae43cfd42a60778d4&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (weather) {
            console.log(weather);
            $('.modal-card-body').empty();
            if (weather.cod === '404') {
                throw Error('<h2>No Weather Data Found</h2>');
            }
            weather.list.forEach(function (weatherObject) {
                if (moment.unix(weatherObject.dt).format("H") === "13") {
                    console.log(weatherObject.main.temp);
                    createCard(weatherObject);
                }
                
            })
        })
        .catch(function (error) {
            $('.modal-card-body').html(error.message);
        })
};

function createCard(weatherObject) {

    var day = $('<h4>').text(moment.unix(weatherObject.dt).format("ddd-MMM Do"));
    var temp = $('<p>').text("Temp: " + weatherObject.main.temp + "F");
    var wind = $('<p>').text("Wind: " + weatherObject.wind.speed + "mph");
    var humid = $('<p>').text("Humidity: " + weatherObject.main.humidity + "%");
    var icon = "<img src=http://openweathermap.org/img/w/" + weatherObject.weather[0].icon + ".png />"
    var cardBody = $('<div>').addClass('card card-content content wrap p-1');
    var messageBad = $('<h4>').text("Maybe Tomorrow").css("color", "red")
    var messageEh = $('<h4>').text("Cloudy but Dry").css("color", "orange")
    var messageGood = $('<h4>').text("Fresh Air!").css("color", "green")
    $('.modal-card-body').append(cardBody.append(day, temp, wind, humid, icon));
    if (weatherObject.weather[0].id === 800) {
        cardBody.append(messageGood)
    } else if (weatherObject.weather[0].id > 800) {
        cardBody.append(messageEh) 
    } else {
        cardBody.append(messageBad)
    }


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
            button.data('image', 'https://www.nps.gov/common/commonspot/templates/images/graphics/404/01.jpg');
        }
        if(park.fullName.length) {
        button.data('title', park.fullName);
        }
        if(park.description) {
        button.data('description', park.description);
        }
        if(park.contacts.length) {
        button.data('phone', 'Phone Number: ' + park.contacts.phoneNumbers[0].phoneNumber);
        }
        if(park.url) {
        button.data('link', park.url);
        }
        if(park.addresses.length) {
        button.data('postalCode', park.addresses[0].postalCode.split('-')[0]);
        button.data('address', 'Address: ' + JSON.stringify(park.addresses[0].line1 + ', ' + park.addresses[0].city + ', ' + park.addresses[0].stateCode + ' ' + park.addresses[0].postalCode));
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
    if ($(this).data('postalCode')) {
        getWeather($(this).data('postalCode'))
        } else {
            $('.weatherBtn').attr('disabled');
        };
})


$('select').change(function () {
    getState($('#state-code').val());
})

$('#parks-list').on('click', '.weatherBtn', function () {
    $('.modal').addClass("is-active");
    if ($(this).data('postalCode')) {
        getWeather($(this).data('postalCode'))
        } else {
            $('.weatherBtn').attr('disabled');
            $('.modal').removeClass("is-active");  
        };
    console.log("clicked")
})

$('#closeModal').on('click', function () {
    $('.modal').removeClass("is-active");
})

