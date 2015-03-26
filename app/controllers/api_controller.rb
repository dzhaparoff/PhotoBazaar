class ApiController < ApplicationController
  def photo
    @photo = Photo.where(id: params[:id]).take
    render json: @photo
  end
end
