$("#flash-message").hide();
$(".opened-todo").hide();
var opened_list_name;

function GetListData() {
    var getList = localStorage.getItem(opened_list_name);
    var list = JSON.parse(getList);
    return list;
}

// load all list
$(document).ready(function () {
    for (var key in localStorage) {
        $(".todolist-container").append("<button class='todolist'>" + key + "</button>");    
    }
})

// add new list
$("#add-title-btn").click(function () {   
    var new_list = { 'tasks': [] };
    if ($("#title-input").val() == "") {
        $("#title-input").attr('placeholder', "Don't leave me blank!");
    } else {
        localStorage.setItem($("#title-input").val(), JSON.stringify(new_list));
        $(".todolist-container").append("<button class='todolist'>" + $("#title-input").val() + "</button>");
        $('#title-input').val("");
        $("#title-input").attr('placeholder', "Title");
        $('#new-todolist-title-input').hide();
    }

})

//open list
$(".todolist-container").on("click", ".todolist", function () {
    $('.todolist').removeAttr('id');
    $(this).attr('id', 'opened');
    $('#list-of-tasks').empty();
    // get the right list
    opened_list_name = $(this).html();
    var list = GetListData();
    $('.todolist-title').text(opened_list_name);
    $('.opened-todo').show();
    for (var i = 0; i < list.tasks.length; i++) {
        $('#list-of-tasks').append("<li>" + list.tasks[i].value + "<span class='delete'>\u00D7</span></li>");
        if (list.tasks[i].status == "done") {
            $('li').eq(i).addClass('completed-task');


        }
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
        var list = GetListData();
        list.tasks.push({ "value": $("#input").val(), "status": "undone" });
        localStorage.setItem(opened_list_name, JSON.stringify(list));
        $("#list-of-tasks").append("<li>" + $("#input").val() + "<span class='delete'>\u00D7</span></li>");
        $("#input").val("");
    }
})

// delete list
$("#delete-list").click( function () {
    $("#opened").remove();
    localStorage.removeItem(opened_list_name);
    $(this.parentElement.parentElement).hide();  
});

// delete task
$("ul").on("click", ".delete", function () {
    var list = GetListData();
    for (var i = 0; i < list.tasks.length; i++) {
        if (list.tasks[i].value + "\u00D7" == $(this.parentElement).text()) {
            list.tasks.splice(i, 1);
            localStorage.setItem(opened_list_name, JSON.stringify(list));
            $(this.parentElement).remove();
        }       
    } 
});

// set the task status to completed
$("ul").on("click", "li", function () {
    var list = GetListData();
    if ($(this).hasClass("completed-task")) {
        $(this).removeClass('completed-task');
        for (var i = 0; i < list.tasks.length; i++) {
            if (list.tasks[i].value + "\u00D7" == $(this).text()) {
                list.tasks[i].status = "undone";
                localStorage.setItem(opened_list_name, JSON.stringify(list));
            }
        }
    } else {
        $(this).addClass("completed-task");
        for (var i = 0; i < list.tasks.length; i++) {
            if (list.tasks[i].value + "\u00D7" == $(this).text()) {
                list.tasks[i].status = "done";
                 localStorage.setItem(opened_list_name, JSON.stringify(list));
            }
        }
    }
})

