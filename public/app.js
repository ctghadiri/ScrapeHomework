// Grab movies data and display on page

$.getJSON("/Movies", function (data){
    for (var i = 0; i < data.length; i++){
        $("#movies").append("<p data-id='" + data[i]._id + "'>" + data[i].movie + "</p>")
    }
})