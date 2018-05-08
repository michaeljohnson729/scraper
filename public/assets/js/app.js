$.get("/articles");

$("#scrape-button").on("click", function () {
    $.post("/scraper", function (data) {
        location.reload();
    })
})
const getData = function(thisId){
    $("#note-title").val("");
    $("#note-body").val("");
    $.ajax({
        method: "GET",
        url: "/articlesnotes/" + thisId
    }).then(function (data) {
        $("#article-title").empty();
        $("#article-title").append("<h2>" + data.title + "</h2>");
   
        if (data.note) {
            $("#note-title").val(data.note.title);
            $("#note-body").val(data.note.body);
        } else {
            $("#note-title").val("");
            $("#note-body").val("");
        }
    });
}
$("body").on("click", "#note-button", function () {
    const thisId = $(this).attr("data-id");
    getData(thisId);
    $("#submit").attr("data-id", "");
    $("#submit").attr("data-id", thisId);
    $(".modal").css("display", "block");
    
});
const span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        $(".modal").css("display", "none");
    };

$("body").on("click", "#submit", function (e) {
    e.preventDefault();
    const title = $("#note-title").val().trim();
    const note = $("#note-body").val().trim();
    const btnId = $("#submit").attr("data-id");
    const noteRoute = `/notes/${btnId}`;
    $.ajax({
        method: "POST",
        url: noteRoute,
        data: {
            title: title,
            body: note
        }
    });
});
$("body").on("click", "#delete-all-button", function () {
    const deleteRoute = "/articles/removeall"
    $.post(deleteRoute, function (data) {
        location.reload();
    });
});

$("body").on("click", "#delete-button", function () {
    const deleteRoute = `/articles/${$(this).attr("data-id")}`
    $.post(deleteRoute, function (data) {
        location.reload();
    });
});




