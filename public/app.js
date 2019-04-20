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

        var note = $("#note");

        note.append("<h2>" + data.movie + "<h2>")
        note.append("<input id='movieinput' name='movie' >")
        note.append("<textarea id='bodyinput' name='body'></textarea>");
        note.append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
        note.append("<button data-id='" + data._id + "' id='deletenote'>Delete Note</button>");

        if (data.note) {

        $("#movieinput").val(data.note.movie);
        $("#bodyinput").val(data.note.body);
        }
    })

})