import { get } from "http";

// Grab movies data and display on page

$.getJSON("/Movies", function (data){
    for (var i = 0; i < data.length; i++){
        $("#movies").append("<p data-id='" + data[i]._id + "'>" + data[i].movie + "</p>")
    }
})


$(document).on("click", "p", function (){

    $("#note").empty()

    var id = $(this).attr("data-id");

    $.ajax({
        method: get,
        url: "/movies/" + id
    })
    .then(function(data){
        
    })

})