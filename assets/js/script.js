var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");

var tasksToDoEl = document.querySelector("#tasks-to-do");

var tasksInProgressEl = document.querySelector("#tasks-in-progress");

var tasksCompletedEl = document.querySelector("#tasks-completed");

var pageContentEl = document.querySelector("#page-content");
var tasks = [];




var taskFormHandler = function (event) {


    event.preventDefault(); ///event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;

    var taskTypeInput = document.querySelector("select[name='task-type']").value;


    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");

    // has data aatribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");

        completeEditTask(taskNameInput, taskTypeInput, taskId);

    } else {
        // send it as an argument to createTaskEl
        var taskDataObj = {

            name: taskNameInput,

            type: taskTypeInput,

            status: "to do"

        };

        createTaskEl(taskDataObj);
        console.log(taskDataObj);
        console.log(taskDataObj.status);


    }
};




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



    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";


    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);

    listItemEl.appendChild(taskActionsEl);




    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj)


    taskIdCounter++;


};





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

    statusSelectEL.setAttribute("name", "status-change");

    statusSelectEL.setAttribute("data-task-id", taskId);

    statusSelectEL.className = "select-status";




    actionContainerEl.appendChild(statusSelectEL);




    var statusChoices = ["To Do", "In Progress", "Completed"];



    for (var i = 0; i < statusChoices.length; i++) {

        // create option elemnt

        var statusOptionEl = document.createElement("option");

        statusOptionEl.setAttribute("value", statusChoices[i]);

        statusOptionEl.textContent = statusChoices[i];



        //append to select
        statusSelectEL.appendChild(statusOptionEl);



    }
    return actionContainerEl;



};


var completeEditTask = function (taskName, taskType, taskId) {

    // find the matching task list item

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");



    //set new values 
    taskSelected.querySelector("h3.task-name").textContent = taskName;

    taskSelected.querySelector("span.task-type").textContent = taskType;

    // console.log(taskSelected);

    //loop through tasks array and task object with the new content

    for(var i=0; i < tasks.length; i++){
        if(tasks[i].id === parseInt(taskId)){
            tasks[i].name = taskName;
            tasks[i].type =taskType;
        }
    };





    alert("Task Updated!");


    formEl.removeAttribute("data-task-id");

    document.querySelector("#save-task").textContent = "Add Task";


};




var taskButtonHandler = function (event) {
    {


        var targetEl = event.target;


        // edit button was clicked
        if (targetEl.matches(".edit-btn")) {

            console.log("edit", targetEl);

            var taskId = targetEl.getAttribute("data-task-id");

            editTask(taskId);

        } else if (targetEl.matches(".delete-btn")) {

            console.log("delete", targetEl);

            var taskId = targetEl.getAttribute("data-task-id");

            deleteTask(taskId);

        }

    };
};


var taskStatusChangeHandler = function (event) {

    console.log(event.target.value);


    // get the task item's id

    var taskId = event.target.getAttribute("data-task-id");

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");


    //get the currently selected option's value and convert to lowercase 
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item elemnt based on the id


    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }



    //update task's in tasks array

    for(var i = 0; i < tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)){
            tasks[i].stats = statusValue;
        }

    }
 console.log(tasks);

};


var editTask = function (taskId) {
    console.log(taskId);
    // get task list item element

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    // console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    // console.log(taskType);
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    formEl.setAttribute("data-task-id", taskId);
    formEl.querySelector("#save-task").textContent = "Save Task";

};


var deleteTask = function (taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    //create new arrat to hold updated list of tasks

    var updatedTaskArr =[];


    //loop through current tasks 
    for( var i = 0; i < tasks.length; i++){
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)){

            updatedTaskArr.push(tasks[i]);

        }

    }

    //reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
};







formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);