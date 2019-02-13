$(document).ready(function() {
  // globle variable
  var post_it_count = 2;

  // page functions
  $("body").on("DOMSubtreeModified", ".draggable", function() {
    $("#out").text($(".draggable").text());
    //   alert("confirm exit is being called");
  });
  $(".draggable").draggable();
  // $(function() {
  //   $("#draggable").draggable();
  // });
  // window.unload = save;
  $("#save_bt").click(save);
  $("#create_bt").click(create);
  window.onload = load;

  // functions
  function create(e, post_it_text = "") {
    console.log(post_it_text);
    post_it_count += 1;
    $("#land_div").append(
      '<div id="' +
        post_it_count +
        '" class="draggable" contenteditable>' +
        post_it_text +
        "</div>"
    );
    $(".draggable").draggable();
    console.log("Post_it count: " + post_it_count);
  }

  function load() {
    console.log("Loading...");
    post_it = localStorage.getItem("post_it");
    console.log("saved string: " + post_it);
    post_it_arr = post_it.split("|");

    $.each(post_it_arr, function(index, post) {
      if (post != "") {
        console.log(post);
        post_id = post.split(":")[0];
        post_text = post.split(":")[1];
        console.log("ID:" + post_id + " ; " + "Text: " + post_text);
        $("#" + post_id).text(post_text);
        // $(".draggable").text(post[1]);
      }
    });
  }
  function save() {
    //   alert("saved");
    console.log("saving...");
    var post_it = "";
    $(".draggable").each(function(index, value) {
      id = $(this).attr("id");
      text = $(this).text();
      console.log("ID:" + id + " ; " + "Text: " + text);
      post_it = post_it.concat(id + ":" + text + "|");
    });
    console.log(post_it);
    localStorage.setItem("post_it", post_it);

    //   return false;
  }
});
