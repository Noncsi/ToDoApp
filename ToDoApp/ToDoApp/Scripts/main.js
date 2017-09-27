var todolists = [];

class TodoList {
    constructor(title) {
        this.title = title;
        var tasks = [];
        var opened = false;
    }
    addTask(task) {
        tasks.push();
    }               
}

$("#flash-message").hide();
$(".opened-todo").hide();
var todolist_id = 0;
var task_id = 0;

// load all list
$(document).ready(function () {
    for (var i = 1; i <= localStorage.length; i++) {
        //var value = localStorage.getItem("task" + i);
        //$("ul").append("<li id='task" + i + "'>" + value + "<span class='delete'>\u00D7</span></li>");
        var title = localStorage.getItem("todolist" + i);
        $(".todolist-container").append("<button class='todolist' id='todolist" + i + "'>" + title + "</button>");
        todolist_id = i;
    }
})


// add new list
$("#add-title-btn").click(function () {
    todolist_id++;
    $(".todolist-container").append("<button class='todolist' id='todolist" + (todolist_id) + "'>" + $("#title-input").val() + "</button>");
    localStorage.setItem("todolist" + todolist_id, $("#title-input").val());
    $('#title-input').val() = "";
    $('#new-todolist-title-input').hide();
})


function AddNewTask() {
    if ($("#input").val() == "") { // show error message
        $("#flash-message").slideDown(200, function () {
            setTimeout(function () {
                $("#flash-message").slideUp(200);
            }, 3000);
        });
    } else { // add task and empty input
        $("#list-of-tasks").append("<li id='task" + (++task_id) + "'>" + $("#input").val() + "<span class='delete'>\u00D7</span></li>");
        localStorage.setItem("task" + task_id, $("#input").val());
        $("#input").val("");
    }
}

// delete task
$("ul").on("click", ".delete", function () {
    $(this.parentElement).remove();
    localStorage.removeItem(this.parentElement.val());
});

// set the task status to completed
$("ul").on("click", "li", function () {
    $(this).toggleClass('completed-task');
    //$(this).prepend('\u2713 ');   
});