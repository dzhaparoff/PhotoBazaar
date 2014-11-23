class MainpageController < ApplicationController
  def index

  	response = F00px.get('photos/search',{'term' => 'sexy girl', 'sort'=>'highest_rating' , 'rpp'=>"50" })	
	response_hash = JSON.parse(response.body)
	photos = response_hash['photos']

		photos.each { |photo|
			photo['ex_link'] = photo['image_url'].gsub(/\/{1}([a-zA-Z0-9_-]*).jpg/,'/2048.jpg')

			#open('public/images/'+photo['name']+'.jpg', 'wb') do |file|
			#  file << open('photo['ex_link']').read
			#end

		}

	@photos = photos

  end
end