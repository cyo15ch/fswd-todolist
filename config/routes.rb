Rails.application.routes.draw do

  root 'home#index'
  get 'home/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :users, only: [:create]

  get    '/api/tasks'                    => 'tasks#index'
  post   '/api/tasks'                    => 'tasks#create'
  get    '/api/tasks/:id'                => 'tasks#show'
  put    '/api/tasks/:id'                => 'tasks#update'
  put    '/api/tasks/:id/mark_complete'  => 'tasks#mark_complete'
  put    '/api/tasks/:id/mark_active'    => 'tasks#mark_active'
  delete '/api/tasks/:id'                => 'tasks#destroy'
end
