json.extract! temperature, :id, :city_id, :temp, :pressure, :humidity, :temp_min, :temp_max, :created_at, :updated_at
json.url temperature_url(temperature, format: :json)
