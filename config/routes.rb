Rails.application.routes.draw do
  get "cities/refresh_data", to: "cities#refresh_data"
  resources :temperatures
  resources :cities do
    member do
      get :get_temps
    end
  end

  root to: 'cities#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
