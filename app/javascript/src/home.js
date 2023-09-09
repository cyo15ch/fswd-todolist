import $ from 'jquery';

import {
  indexTasks,
  postTask,
} from "./requests.js";

$(document).ready(function () {
  const taskInput = $('#task-input');
  const todoList = $('#todo-list');
  let taskList = [];
  let filter = "All";

  const refreshTasks = () => {
    indexTasks(response => {
      taskList = response.tasks;
      renderTasks();
    }, error => console.error(error));
  };

  const renderTasks = () => {
    todoList.empty();
    const filteredTasks = taskList.filter(task => filter === "All" || (filter === "Active" ? !task.completed : task.completed));
    filteredTasks.forEach(createTaskElement);
  };

  const createTaskElement = (task) => {
    const taskDiv = $('<div>').addClass('task');
    taskDiv.addClass(task.completed ? 'completed' : '').attr('data-id', task.id);

    const markCompleteButton = $('<span>').addClass('mark-complete-button').appendTo(taskDiv);
    const taskContent = $('<p>').addClass('task-content').text(task.content).appendTo(taskDiv);
    const removeButton = $('<span>').addClass('remove-button').text('×').appendTo(taskDiv);

    if (task.completed) taskDiv.addClass('completed');
    else taskDiv.removeClass('completed');

    markCompleteButton.click(() => toggleTaskCompletion(task, taskDiv));
    removeButton.click(() => removeTask(task.id, taskDiv));

    todoList.append(taskDiv);
  };

  const toggleTaskCompletion = (task, taskDiv) => {
    const toggleFunction = task.completed ? markTaskAsActive : markTaskAsComplete;
    toggleFunction(task.id, response => {
      task.completed = !task.completed;
      renderTasks();
    }, error => console.error(error));
  };

  const removeTask = (id, taskDiv) => {
    deleteOneTask(id, response => {
      taskList = taskList.filter(task => task.id !== id);
      taskDiv.remove();
    }, error => console.error(error));
  };

  $('.filter-button').click(function() {
    filter = $(this).attr('id');
    $('.filter-button').removeClass('selected');
    $(this).addClass('selected');
    renderTasks();
  });

  $('#task-input').on('keydown', function (e) {
    if (e.which === 13 && taskInput.val() !== '') {
      postTask(taskInput.val(), () => {
        taskInput.val('');
        refreshTasks();
      }, error => console.error(error));
    }
  });

  refreshTasks();
});
