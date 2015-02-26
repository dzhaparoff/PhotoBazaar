class Admin::Api::ApiController < Admin::AdminController
	
#	skip_before_filter :verify_authenticity_token
	
	def fh_check

			@params = params['formData']	 	
			@responce = fh_photos_search @params

		render json: @responce
	end	

	def get_photos
		photos = Array.new
		ph = Photo.select('photo_id').all

		ph.each do |p|
			photos << p.photo_id
		end

		render json: photos
	end

	def get_photo

	 	response = F00px.get( 'photos/'+params[:id], params )
		@response_hash = JSON.parse(response.body)
		render json: @response_hash

	 end

	private 

	def fh_photos_search (params)
		      
		    response = F00px.get( 'photos/search' , { 'term' => params['term'], 'sort'=> params['sort'] , 'rpp'=> params['rpp'], 'only' => params['category'], 'image_size' => '3' } )
			response_hash = JSON.parse(response.body)
			
			photos = response_hash['photos']
			
				photos.each do |photo|
					photo['local_image_url'] = '/images/fh_'+photo['id'].to_s+'.'+photo['image_format']
				end

			response_hash['photos'] = photos 

			return response_hash    

	 end

end
