$(document).ready(function() {
  // globle variable
  var post_it_count = 0;

  // page functions
  $("#save_bt").click(save);
  $("#create_bt").click(create);
  window.onload = load;

  // functions
  function create(e, post_it_text = "", pos_x = "16", pos_y = "48") {
    //TODO: find solution to avoid position hard-code
    console.log(
      "Create post_it id: " +
        post_it_count +
        "; text: " +
        post_it_text +
        "; pos-X: " +
        pos_x +
        "; post-Y: " +
        pos_y
    );
    post_it_count += 1;
    $("#land_div").append(
      '<div id="' +
        post_it_count +
        '" class="draggable" style="position: absolute; top: ' +
        pos_y +
        "px; left: " +
        pos_x +
        'px"; contenteditable>' +
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
        post_text = post.split(":")[1];
        pos_x = post.split(":")[2];
        pos_y = post.split(":")[3];
        create(null, post_text, pos_x, pos_y);
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
      pos_x = $(this).position().left;
      pos_y = $(this).position().top;
      console.log(
        "ID:" +
          id +
          "; Text: " +
          text +
          "; pos X: " +
          pos_x +
          "; pos Y: " +
          pos_y
      );
      // TODO: restrict Post-it input text ":" and "|" to prevent save break
      post_it = post_it.concat(
        id + ":" + text + ":" + pos_x + ":" + pos_y + "|"
      );
    });
    console.log(post_it);
    localStorage.setItem("post_it", post_it);

    //   return false;
  }
});
