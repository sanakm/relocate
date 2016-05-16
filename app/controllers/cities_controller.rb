class CitiesController < ApplicationController
  def index
    render json: City.all.to_json
  end
end
