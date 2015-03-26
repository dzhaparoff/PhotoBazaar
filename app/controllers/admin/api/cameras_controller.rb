class Admin::Api::CamerasController < Admin::AdminController
  def index
    cameras = Camera.order('id').all
    render json: cameras
  end
 
  def show
    camera = Camera.find(params[:id])
    render json: camera
  end

  def new
    camera = Camera.new
    render json: camera
  end

  def edit
    
  end

  def create
    @camera = Camera.new(camera_params)
    @camera.name = 'Undefined' if @camera.name.nil?

    if @camera.save
      render json: @camera
    else
      @camera = Camera.find_by_name(params[:name])
      render json: @camera
    end
  end

  def update
    
  end

  def destroy
    
  end

  private

  def camera_params
    params.require(:camera).permit(:name, :code, :brand, :camera_type, :lens_mount)
  end
end
