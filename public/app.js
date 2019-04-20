// Grab movies data and display on page

$.getJSON("/Movies", function (data){
    for (var i = 0; i < data.length; i++){
        $("#movies").append("<div id='movie-group'><p data-id='" + data[i]._id + "'>" + data[i].movie + "</p>" + "<br />" + "<button href=" + data[i].link + "> Link </button></div>")
    }
})
$.getJSON("/allnotes", function (data){
    for (var i = 0; i < data.length; i++){
        if (data.body !== ""){
            $("#movies").append("<div id='movie-group'><p data-id='" + data[i]._id + "'</p></div>")
        }
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
    url: "/movies/" + id,
    data: {
        movie: $("#movieinput").val(),
        body: $("#bodyinput").val()
    }
    })
    .then(function(data) {
        console.log(data);
        $("#notes").empty();
    });

    $("#movieinput").val("");
    $("#bodyinput").val("");
});

$(document).on("click", "#deletenote", function (){

    var id = $(this).attr("data-id");

    $.ajax({
    method: "POST",
    url: "/movies/" + id,
    data: {
        movie: "",
        body: ""
    }
    })
    .then(function(data) {
        console.log(data);
        $("#movieinput").empty();
        $("#notes").empty();
    });
});