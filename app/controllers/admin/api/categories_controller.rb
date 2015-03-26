class Admin::Api::CategoriesController < Admin::AdminController
  #skip_before_filter :verify_authenticity_token

  def index
    categories = Category.order('sort').all
    categories.each do |c|
      c[:photos_count] = c.photos.count.to_s
    end
    render json: categories
  end

  def show
    @category = Category.find(params[:id])
    render json: @category
  end

  def new
    @category = Category.new
    render json: @category
  end
  
  def create
    @category = Category.new(category_params)
    @category.save
    render json: @category
  end

  def edit
    
  end

  def update
    @category = Category.find(params[:id])
    @category.update(category_params)
    render json: @category
  end

  def destroy
    @category = Category.find(params[:id])
    @category.destroy
    render json: @category
  end

  private

  def category_params
    params.require(:category).permit(:name, :description, :sort, :name_l18n, :photos_count, :code)
  end
end
