Rails.application.routes.draw do
  resources :temperatures
  resources :cities do
    member do
      get :get_temps
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
