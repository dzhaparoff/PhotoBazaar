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
    
  get 'images/get_top_fl'
  get 'images/get_top_fh'
  get 'images/' => 'images#index'


  resources :photos, only: [:index]
  #resources :categories, only: [:index, :show]

  get 'fresh' => 'photos#fresh', as: :fresh_photos_page

  get 'photo/:id' => 'photos#show'
  
  get ':cat_slug', to: 'photos#category', as: :categories


  
end
