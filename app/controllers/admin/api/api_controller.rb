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

	def sync_old_photos
		
		renderOut = String.new

		Photo.where('id <= ? AND id >= ?', params[:end], params[:start]).find_each(batch_size: 10) do |photo|

			 response_promise = F00px.get( 'photos/'+photo.photo_id.to_s )
			 response = JSON.parse(response_promise.body)
			
			photo_f = response["photo"]

			unless photo_f == nil

			photo.iso = photo_f["iso"]
			photo.focal_length = photo_f["focal_length"]
			photo.shutter_speed = photo_f["shutter_speed"]
			photo.aperture = photo_f["aperture"]
			photo.latitude = photo_f["latitude"]
			photo.longitude = photo_f["longitude"]

			photo.save

			renderOut << photo.id.to_s + " - Обновлен \n\r"

			end

		end

		render text: renderOut

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
