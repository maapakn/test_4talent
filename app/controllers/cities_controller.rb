class CitiesController < ApplicationController
  before_action :set_city, only: [:show, :edit, :update, :destroy, :get_temps]

  # GET /cities
  # GET /cities.json
  def index
    @cities = JSON.parse(City.all.map{|city|
      {id: city.id, name: city.name, temp: city.temp, temperatures: city.temperatures ? city.temperatures : []}
    }.to_json)
  end

  # GET /cities/1
  # GET /cities/1.json
  def show
  end

  # GET /cities/:id/get_temps
  def get_temps
    @temp = Rails.configuration.open_weather_api.current(city: @city.name)["main"]
    @temperature = Temperature.create!({
      city: @city,
      temp: @temp["temp"],
      pressure: @temp["pressure"],
      humidity: @temp["humidity"],
      temp_min: @temp["temp_min"],
      temp_max: @temp["temp_max"]
      }
    )
    render json: @temperature, status: 200
  end

  def refresh_data
    @cities = JSON.parse(City.all.map{|city|
      {id: city.id, name: city.name, temp: city.temp, temperatures: city.temperatures ? city.temperatures : []}
    }.to_json)
    render json: @cities, status: 200
  end

  # GET /cities/new
  def new
    @city = City.new
  end

  # GET /cities/1/edit
  def edit
  end

  # POST /cities
  # POST /cities.json
  def create
    @city = City.new(city_params)

    respond_to do |format|
      if @city.save
        format.html { redirect_to @city, notice: 'City was successfully created.' }
        format.json { render :show, status: :created, location: @city }
      else
        format.html { render :new }
        format.json { render json: @city.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /cities/1
  # PATCH/PUT /cities/1.json
  def update
    respond_to do |format|
      if @city.update(city_params)
        format.html { redirect_to @city, notice: 'City was successfully updated.' }
        format.json { render :show, status: :ok, location: @city }
      else
        format.html { render :edit }
        format.json { render json: @city.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /cities/1
  # DELETE /cities/1.json
  def destroy
    @city.destroy
    respond_to do |format|
      format.html { redirect_to cities_url, notice: 'City was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_city
      @city = City.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def city_params
      params.require(:city).permit(:name)
    end
end
