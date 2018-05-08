$.get("/articles");
$("#scrape-button").on("click", function () {
    console.log("button clicked");
    $.post("/scraper", function (data) {
        location.reload();
    })
})

$("body").on("click", "#edit-button", function (){
    console.log($(this).attr("data-id"))
})






