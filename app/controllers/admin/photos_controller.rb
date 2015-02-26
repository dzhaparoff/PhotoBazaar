class Admin::PhotosController < Admin::AdminController
	def index
		@photos = Photo.paginate(:page => params[:page], :per_page => 25)
	end
	
	def show
		
	end

	def new
		
	end

	def edit
		
	end

	def create
		
	end

	def update
		
	end

	def destroy
		
	end
end
