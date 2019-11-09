
$(document).ready(function() {
    var topics = ["Seinfeld",
                "F.R.I.E.N.D.S", 
                "Full House", 
                "Frasier", 
                "Roseanne", 
                "Home Improvement",
                "Family Matters",
                "Boy Meets World",
                "Saved by the Bell",
                "Cheers"
                ]

    function renderButtons() {

        $("#buttonArea").empty();
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>")
            button.text(topics[i])
            button.attr("data-show", topics[i])
            button.attr("data-state", "still")
            button.val(topics[i])
            button.addClass("button")
            $("#buttonArea").append(button)
        }

      }

      $("#addSitcom").on("click", function(event) {
        event.preventDefault();

        var sitcom = $("#sitcomSearch").val().trim();
        topics.push(sitcom);
        renderButtons();
      });

    $(document).on("click", ".button",function(){
        var show = $(this).attr("data-show");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          show + "&api_key=8Uz0VX7TDbM2Vs9ziIHn2mO785jBpCXS&limit=10";

          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response){
              console.log(queryURL);
              console.log(response);
              var results = response.data;

              for (var i = 0; i < results.length; i++) {
                var p = $("<p>").text("Rating: " + results[i].rating);
                p.css("margin-top", "0px")
                var showImage = $("<img>");
                showImage.attr("class", "gif")
                var showDiv = $("<div>")

                showImage.attr("src", results[i].images.fixed_height_still.url);
                showImage.attr("data-animate", results[i].images.fixed_height.url)
                showImage.attr("data-still", results[i].images.fixed_height_still.url)
                
                showDiv.append(p);
                showDiv.prepend(showImage);
                showDiv.css("margin-bottom", "50px")
                showDiv.css("margin-right", "50px")
                showDiv.css("display", "inline-block")
                $("#gifArea").prepend(showDiv)
                    
              }
              $(".gif").on("click", function() {
                console.log($(this))
                var state = $(this).attr("data-state");
                if (state === "still") {
                 $(this).attr("src", $(this).attr("data-animate"));
                 $(this).attr("data-state", "animate");
                } else {
                 $(this).attr("src", $(this).attr("data-still"));
                 $(this).attr("data-state", "still");
               }
         })
        })
    })
    renderButtons();
})