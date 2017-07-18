$(document).ready(function(){
    $.ajax({
        method: "GET",
        url: "https://s3-ap-southeast-2.amazonaws.com/racevic.test-static/fe-test/racing-data-sample-v1.json",
        dataType: "json"
    }).done(function(data){

        console.log(data);

        var headerBanner   = $("#header-banner-template").html();
        var headerBannerTemplate = Handlebars.compile(headerBanner);

        var raceResults   = $("#race-results-template").html();
        var raceResultsTemplate = Handlebars.compile(raceResults);

        var headerBannerHtml   = headerBannerTemplate(data.Races[0]);
        $('#main').append(headerBannerHtml);

        var resultsHtml   = raceResultsTemplate(data.Races[0].raceCollection[1]);
        $('#main').append(resultsHtml);
    });
});