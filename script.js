$(document).ready(function() {
  $("button").click(function() {
    var collectData = $("input").val(); //Item for search
    //creating elements for alert message box
    var message = $(
      "<div class='alert alert-success mt-2' role='alert'></div>"
    );
    var messageHeading = $("<h4 class='alert-heading'></h4>");
    $(messageHeading).append(
      "Showing results for <strong>" + collectData + "</strong>."
    );
    var messageParagraph = $("<p>Please wait...</p>");
    $(message)
      .append(messageHeading)
      .append(messageParagraph)
      .fadeOut(4000);
    $("button").after(message);
    //call to Ajax
    $.ajax({
      url:
        "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&titles=" +
        collectData +
        "&formatversion=2&srsearch=" +
        collectData +
        "&srprop=snippet",
      dataType: "jsonp",
      type: "GET",
      success: function(data) {
        var dataList = data.query.search; //Array of Objects
        var elementSize = document.getElementById("myList").childElementCount;
        /*if number of elements in a div becomes greater than 10 then, remove all of it's child elements*/
        if (elementSize >= 10) {
          $("#myList").empty();
        }

        for (var i = 0; i <= dataList.length; i++) {
          var baseUrl = "https://en.wikipedia.org/?curid=" + dataList[i].pageid;
          console.log(baseUrl);
          var title = dataList[i].title;
          var snippet = dataList[i].snippet;
          //creating elements
          var element = $(
            "<a target=_blank class='list-group-item list-group-item-action'></a>"
          );
          $(element).attr("href", baseUrl);
          var insideEle =
            "<h3 class='text-info'>" + title + "</h3><p>" + snippet + "</p>";
          //pushing elements in a div
          $(".list-group").append(element);
          $(element).html(insideEle);
        }
      }
    });
  });
});
