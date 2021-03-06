$(function(){
    function ajaxSuccess(data) {
        var imageUrl = data["image_url"];
        var kittyId = data["id"];
        var kittyGen = data["generation"];
        var kittyName = data["name"];
        var kittyOwnerName = data["owner"]["nickname"];
        var kittyBio = data["bio"];
        var attrList = data["cattributes"];
        var currentPrice = parseFloat(data["auction"]["current_price"]) / 1000000000000000000;
        var startPrice = parseFloat(data["auction"]["start_price"]) / 1000000000000000000;
        var endPrice = parseFloat(data["auction"]["end_price"]) / 1000000000000000000;

        $("#kittyImage").attr("src", imageUrl);
        $("#kitty_name1").text(kittyName);
        $("#kitty_name2").text("Kitty " + kittyId);
        $("#kitty_gen").text("Gen " + kittyGen);
        $("#kitty_onwer").text(kittyOwnerName);
        $("#kitty_bio").text(kittyBio);
        $("#kitty_current_price").text("" + currentPrice);
        $("#kitty_for_sale").text("" + currentPrice);
        $("#start_price").text("" + startPrice);
        $("#end_price").text("" + endPrice);
        $("#listAttributes")[0].innerHTML = "";
        attrList.forEach(function(entry) {
            $("#listAttributes")[0].innerHTML += attributeHtml(entry["description"]);
        });
    }

    function ajaxFail(data) {
        alert("The kitty isn't found");
    }

    function attributeHtml(attr) {
        return '<a class="ListAttributes-item" aria-current="false" href="https://www.cryptokitties.co/marketplace/all?search=royalpurple">' + attr + '</a>';
    }
    
    function ajaxLoad(url) {
        var data = {};
        var request = $.ajax({
            url: url,
            data: data
        })
        request.done(ajaxSuccess);
        request.fail(ajaxFail);
    }

    function initWithNumber(number) {
        var url = "https://api.cryptokitties.co/kitties/" + number;
        if (idList.indexOf(number) > -1) {
            var style = ".u-bg-alt-limegreen { background-color: #fff }";
            $("#custom_style")[0].innerHTML = style;
            ajaxSuccess(myOwnKitties[number]);
        } else {
            $("#custom_style")[0].innerHTML = "";
            ajaxLoad(url);
        }
    }

    $("#search_button").click(function (){
        initWithNumber($("#search_by_id").val());
    });

    initWithNumber("10");

    // add love words
    console.log("Hello");
});
