class Admin::AdminController < ApplicationController
  layout 'admin'
  before_action :authenticate_user!, :user_is_admin?

  def index
    @count = {}
    @count[:categories] = Category.all.count
    @count[:photos] = Photo.all.count
    @count[:photographers] = Photographer.all.count
    @count[:cameras] = Camera.all.count
  end

  private

  def user_is_admin?
    redirect_to :root if current_user.email != 'd_enver@mail.ru' && user_signed_in?
  end
end
