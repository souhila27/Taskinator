var taskIdCounter = 0;



// var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var formEl = document.querySelector("#task-form");

var taskFormHandler = function (event) {

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    formEl.reset();

    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

}




var createTaskEl = function (taskDataObj) {

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");

    // give it a class name
    taskInfoEl.className = "task-info";

    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    // console.log(taskActions);
    listItemEl.appendChild(taskActionsEl)



    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    // increase task counter for next unique id
    taskIdCounter++;





}


var createTaskActions = function (taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEL = document.createElement("select");
    statusSelectEL.className = "select-status";
    statusSelectEL.setAttribute("name", "status-change");
    statusSelectEL.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEL);



    var statusChoices = ["To Do", "In Progress", "Completed"];


    for (var i = 0; i < statusChoices.length; i++) {
        // create option elemnt

        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEL.appendChild(statusOptionEl);


    }





    return actionContainerEl;


}



formEl.addEventListener("submit", taskFormHandler);

var pageContentEl = document.querySelector("#page-content");

var taskButtonHandler = function (event) {
    // get target element from event
    console.log(event.target);
    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }




    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        console.log("you clicked the delete button!");
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }

};
pageContentEl.addEventListener("click", taskButtonHandler);

var deleteTask = function (taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};


var editTask = function (taskId) {
    console.log("editing task#" + taskId);
    // get task list item element

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
}




