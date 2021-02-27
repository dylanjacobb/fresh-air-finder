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
    }
)
};

function li(parksData) {
$('#parks-list').empty();
for(var i = 0; i < parksData.length; i++) {
    $('#parks-list').append('<li ><button type="button" class="parkBtn" id="parkButton' + [i] + '">' + parksData[i].fullName + '</button>' + '</li>')
}
}
// Fill tiles with park info
// function tile(parksData) {
    //     for(var i = 0; i < parksData.length; i++) {
        //         $('img').attr('src', parksData[i].images[0].url)
        //     }
        // }
        
        
        $("#parks-list").on("click", function(e){
            e.preventDefault();
            var idClicked = e.target.id;
            console.log(idClicked);
            var num = idClicked.split("parkButton")[1];
            console.log(num);
        });
        
        // $(".parkBtn").click(function(event) {
        //     event.preventDefault();
            

            // var btnClicked = $(this);
            // console.log(btnClicked.id);
            
            // console.log($(this));
            // $(this).attr("id").split("parkButton")[1]
        
            // tile(parksData)
        // });
        
        
        $('select').change(function(e) {
    e.preventDefault();
    getState();
})


// var userInput = $("#" + clickedHour).val().trim()
// if (userInput) {
    // localStorage.setItem("hour" + clickedHour, userInput)
// }