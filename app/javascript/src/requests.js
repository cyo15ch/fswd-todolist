console.log('ajax requests');

import $ from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

export const indexTasks = function (successCB, errorCB) {
  const request = {
    type: 'GET',
    url: 'api/tasks?api_key=1',
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
};

export const postTask = function (content, successCB, errorCB) {
  const request = {
    type: 'POST',
    url: 'api/tasks?api_key=1',
    data: {
      task: {
        content: content
      }
    },
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
};

export const deleteOneTask = function (taskId, successCB, errorCB) {
  const request = {
    type: 'DELETE',
    url: `api/tasks/${taskId}?api_key=1`,
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
};

export const markTaskAsComplete = function (taskId, successCB, errorCB) {
  const request = {
    type: 'PUT',
    url: `api/tasks/${taskId}/mark_complete?api_key=1`,
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
};

export const markTaskAsActive = function (taskId, successCB, errorCB) {
  const request = {
    type: 'PUT',
    url: `api/tasks/${taskId}/mark_active?api_key=1`,
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
};
