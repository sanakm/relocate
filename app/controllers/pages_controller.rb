class PagesController < ApplicationController

  def index
  end

  def app
    @
  end

  def upload
    @cities = City.all
  end
  
  def import
    City.import(params[:file])
    logger.info "************"
    logger.info params.inspect
    logger.info "************"
    #redirect_to upload_path
    redirect_to upload_url
  end

end
