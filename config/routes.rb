Rails.application.routes.draw do
   
  devise_for :users, :controllers => { 
    omniauth_callbacks: "users/omniauth_callbacks",
    sessions: 'users/sessions'
   }

  root 'mainpage#index'

  #admin_panel
  namespace :admin do
    root 'admin#index'
    get 'photos_import/' => 'photos_import#index'

    #get 'photos/:page' => 'photos#index'
    resources :photos
    resources :categories
    resources :photographers
    resources :cameras
      namespace :api do
          resources :photos
          resources :categories
          resources :photographers
          resources :cameras
          get  '/:action' => 'api' #non RESTful api
          post '/:action' => 'api' #non RESTful api
      end
  end

  
  get 'api/:action' => 'api'
 
  get 'photo/:id' => 'photos#show', as: :photo_page
  get 'photo/:id/from_user' => 'photos#user_photo', as: :user_photo_page
  get 'photo/:id/from_fresh' => 'photos#fresh_photo', as: :fresh_photo_page
  get 'photo/:id/from_bpod' => 'photos#bpod_photo', as: :bpod_photo_page

  get 'fresh' => 'photos#fresh', as: :fresh_photos_page
  get 'photos_of_the_day' => 'photos#photos_of_the_day', as: :photos_of_the_day_page
  
  get ':cat_slug', to: 'photos#category', as: :categories
  
end
