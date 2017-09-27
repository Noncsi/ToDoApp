$("#flash-message").hide();
$(".opened-todo").hide();
var todolist_id = 0;
var opened_list_id;

// load all list
$(document).ready(function () {
    for (var i = 1; i <= localStorage.length; i++) {
        var getList = localStorage.getItem("todolist" + i);
        if (getList != null) {
            var list = JSON.parse(getList); 
            $(".todolist-container").append("<button class='todolist' id='todolist" + i + "'>" + list.title + "</button>");
            todolist_id = i;
        }       
    }
})

// add new list
$("#add-title-btn").click(function () {
    todolist_id++;
    $(".todolist-container").append("<button class='todolist' id='todolist" + (todolist_id) + "'>" + $("#title-input").val() + "</button>");
    $('#new-todolist-title-input').hide();
    var new_list = { 'title': $("#title-input").val(), 'tasks': [] };
    localStorage.setItem("todolist" + todolist_id, JSON.stringify(new_list));
    $('#title-input').val(""); 
})

//open list
$(".todolist-container").on("click", ".todolist", function () {
    $('#list-of-tasks').empty();
    // get the right list
    var getList = localStorage.getItem($(this).attr('id'));
    var list = JSON.parse(getList);
    // set it global to make it clear what is showing
    opened_list_id = $(this).attr('id');
    $('.todolist-title').text(list.title);
    $('.opened-todo').show();
    for (var i = 0; i < list.tasks.length; i++) {
        $('#list-of-tasks').append("<li>" + list.tasks[i].value + "<span class='delete'>\u00D7</span></li>");    
    }
})

// add task
$("#add-btn-container").click(function () {
    if ($("#input").val() == "") { // show error message
        $("#flash-message").slideDown(200, function () {
            setTimeout(function () {
                $("#flash-message").slideUp(200);
            }, 3000);
        });
    } else { // add task and empty input
        // get the right list
        var getList = localStorage.getItem(opened_list_id);
        var list = JSON.parse(getList);
        // push new task into list
        list.tasks.push({ "value": $("#input").val(), "status": "incomplete" });
        // set it in the localstorage
        localStorage.setItem(opened_list_id, JSON.stringify(list));
        $("#list-of-tasks").append("<li>" + $("#input").val() + "<span class='delete'>\u00D7</span></li>");
        $("#input").val("");
    }
})

// delete list
$("#delete-list").click( function () {
    $("#" + opened_list_id).remove();
    localStorage.removeItem(opened_list_id);
    $(this.parentElement).hide();  
});

// delete task
$("ul").on("click", ".delete", function () {
    var getList = localStorage.getItem(opened_list_id);
    var list = JSON.parse(getList);
    $(this.parentElement).remove();
    for (var i = 0; i < list.tasks.length; i++) {
        if (list.tasks[i].value === $(this.parentElement).val()) {
            localStorage.removeItem(list.tasks[i]);
        }       
    }   
});

// set the task status to completed
$("ul").on("click", "li", function () {
    var clear_val;
    if ($(this).hasClass("completed-task")) {
        $(this).removeClass('completed-task');
        $(this).val("");
        $(this).val(clear_val);
    } else {
        clear_val = $(this).val();
        $(this).addClass("completed-task");
        $(this).prepend("Done: ");
    }
    
    
    //$(this).prepend('\u2713 ');   
});