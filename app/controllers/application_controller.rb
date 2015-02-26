class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  	after_filter :set_csrf_cookie_for_ng

	def set_csrf_cookie_for_ng
	  cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
	end

	def get_last_photo_of_the_day 

		today = Date.today

   		begin 
		  best_photo_of_day = Photo.best_photos_of_the_day(today).take
		  today = today - 1
		end while best_photo_of_day == nil

		first_photo_day = Photo.first_photo.created_at.to_date
		best_photo_of_day_number = (today - first_photo_day).to_int

		return Hash photo: best_photo_of_day, number: best_photo_of_day_number

	end

	def get_photo_of_the_day day

		begin 
		  best_photo_of_day = Photo.best_photos_of_the_day(day).take
		  day = day - 1
		end while best_photo_of_day == nil

		first_photo_day = Photo.first_photo.created_at.to_date
		best_photo_of_day_number = (day - first_photo_day).to_int

		return Hash photo: best_photo_of_day, number: best_photo_of_day_number

	end

	def hex_to_rgba hex_color, opacity

		rgba_color = Array.new
        rgba_color << hex_color[1..2].to_i(16)
        rgba_color << hex_color[3..4].to_i(16)
        rgba_color << hex_color[5..6].to_i(16)

       return rgba_color * ',' + ',' + opacity.to_s

	end

	protected

	  def verified_request?
	    super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
	  end

end
