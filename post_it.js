$(document).ready(function() {
  // globle variable

  // page functions
  $("#save_bt").click(save);
  $("#create_bt").click(create);
  $("#bin").droppable({
    drop: throw_away
  });
  window.onload = load;

  // functions
  function throw_away(e, ui) {
    console.log(e);
    post_it_id = e["toElement"]["id"];
    console.log("Post-it with ID: " + post_it_id + " is removed!");
    $("#" + post_it_id).remove();
  }

  function create(e, post_it_text = "", pos_x = "16", pos_y = "48") {
    //TODO: find solution to avoid position hard-code
    console.log(
      "Create post_it text: " +
        post_it_text +
        "; pos-X: " +
        pos_x +
        "; post-Y: " +
        pos_y
    );
    $("#land_div").append(
      '<div class="draggable" style="position: absolute; top: ' +
        pos_y +
        "px; left: " +
        pos_x +
        'px"; contenteditable>' +
        post_it_text +
        "</div>"
    );
    // .uniqueId();
    $(".draggable").uniqueId();
    $(".draggable").draggable();
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
