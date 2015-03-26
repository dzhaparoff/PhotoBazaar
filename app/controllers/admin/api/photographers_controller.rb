class Admin::Api::PhotographersController < Admin::AdminController

  def index
    photographers = Photographer.all
    render json: photographers
  end
  
  def show
    @photographer = Photographer.find(params[:id])
    render json: @photographer
  end

  def new
    @photographer = Photographer.new
    render json: @photographer
  end

  def create
    userpic_file = '/images/userpic_' + params[:username] + '.jpg'
    userpic_exist = File.exist?('public' + userpic_file)
    
    unless userpic_exist
      open('public' + userpic_file, 'wb') do |file|
        file << open(params[:userpic_url]).read
      end
    end
    
    @photographer = Photographer.new(photographer_params)
    @photographer.userpic = userpic_file
    @photographer.name = photographer_params[:username]
    
    if @photographer.save
      render json: @photographer
    else
      @photographer = Photographer.find_by_username(params[:username])
      render json: @photographer
    end
  end

  def edit
  end

  def update
    @photographer = Photographer.find(params[:id])
    @photographer.update(photographer_params)
    render json: @photographer
  end

  def destroy
    @photographer = Photographer.find(params[:id])
    @photographer.destroy
    render json: @photographer
  end

  private

  def photographer_params
    params
      .require(:photographer)
      .permit(:name, :user_id, :username, :firstname, :lastname, :fullname, :city, :country)
  end
end
