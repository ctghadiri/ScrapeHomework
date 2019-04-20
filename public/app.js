// Grab movies data and display on page

$.getJSON("/Movies", function (data){
    for (var i = 0; i < data.length; i++){
        $("#movies").append("<p data-id='" + data[i]._id + "'>" + data[i].movie + "<br />" + data[i].link + "</p>")
    }
})

// on click listener to generate note
$(document).on("click", "p", function (){

    $("#note").empty()

    var id = $(this).attr("data-id");

    $.ajax({
        method: "GET",
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
    });

});

// click listener to save note
$(document).on("click", "#savenote", function (){

    var id = $(this).attr("data-id");

    $.ajax({
    method: "POST",
    url: "/articles/" + id,
    data: {
        movie: $("#movieinput").val(),
        body: $("#bodyinput").val()
    }
    })
    .then(function(data) {
        console.log(data);
        $("#notes").empty();
    });

    $("#titleinput").val("");
    $("#bodyinput").val("");
});

$(document).on("click", "#deletenote", function (){

    var id = $(this).attr("data-id");

    $.ajax({
    method: "POST",
    url: "/articles/" + id,
    data: {
        movie: $("#movieinput").empty(),
        body: $("#bodyinput").empty()
    }
    })
    .then(function(data) {
        console.log(data);
        $("#notes").empty();
    });
});