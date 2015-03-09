class PhotosController < ApplicationController

	def index
		if(params[:search]) then
			@photos = Photo.search(params[:search]).page(params[:page])
		else
			@photos = Photo.page(params[:page])
		end
	end

	def photos_of_the_day 

		last_photo_of_the_day_number = Photo.publish_dates_count

	end

	def show

		@photo = Photo.where(id: params[:id]).take
		@colors = @photo.colors

		@photo_next = @photo.next_in_cat
		@photo_pre = @photo.previous_in_cat

		@photo_next_link = photo_page_path @photo_next.id unless @photo_next.nil?
		@photo_pre_link = photo_page_path @photo_pre.id unless @photo_pre.nil?

		@content_class = 'photo_detail'

		check_loading_mode
		
	end

	def user_photo

		@photo = Photo.where(id: params[:id]).take
		@colors = @photo.colors

		@photo_next = @photo.next_in_user
		@photo_pre = @photo.previous_in_user

		@photo_next_link = user_photo_page_path @photo_next.id unless @photo_next.nil?
		@photo_pre_link = user_photo_page_path @photo_pre.id unless @photo_pre.nil?

		@content_class = 'photo_detail'

		check_loading_mode
		
	end

	def fresh_photo

		@photo = Photo.where(id: params[:id]).take
		@colors = @photo.colors

		@photo_next = @photo.next_in_fresh
		@photo_pre = @photo.previous_in_fresh

		@photo_next_link = fresh_photo_page_path @photo_next.id unless @photo_next.nil?
		@photo_pre_link = fresh_photo_page_path @photo_pre.id unless @photo_pre.nil?

		@content_class = 'photo_detail'
		
		check_loading_mode
		
	end

	def category

		@cat = Category.find_by_code(params[:cat_slug].to_s)

		@best_photo_in_category  = Photo.best_photo_in_category(@cat.id)
		@best_photo_bg_color    = hex_to_rgba @best_photo_in_category.base_color, 0.4
		
		@photos = Photo.where(category_id: @cat.id).page(params[:page])

		@page = params[:page] != nil ? params[:page] : 1
		@per_page = Photo.per_page
		@total = @photos.count

		@page_title = @cat.name_l18n;

		check_loading_mode

	end

	def fresh

		@page_title = 'Свежие фотографии';

		day = Date.today
		interval = APP_CONFIG['fresh_interval']
		@photos = Photo.where(:created_at => ((day-interval).beginning_of_day .. day.end_of_day)).page(params[:page])

		@page = params[:page] != nil ? params[:page] : 1
		@per_page = Photo.per_page
		@total = @photos.count

		photo_of_the_day 		  = get_last_photo_of_the_day
   		@best_photo_of_day 		  = photo_of_the_day[:photo]
   		@best_photo_of_day_number = photo_of_the_day[:number]
        @best_photo_bg_color      = hex_to_rgba @best_photo_of_day.base_color, 0.4

        @last_bp_number = @best_photo_of_day_number

        if params[:page].to_i > 1 then
        	
        	cur_page_first_photo_day = @photos.first.created_at.to_date
        	photo_of_current_page = get_photo_of_the_day cur_page_first_photo_day

        	@photo_of_current_page = photo_of_current_page[:photo]
        	@photo_of_current_page_number = photo_of_current_page[:number]
	        @photo_of_current_page_bg_color = hex_to_rgba @photo_of_current_page.base_color, 0.4

	        @render_another_photo_of_day = true if params[:mode] == 'partial'
	        @last_bp_number = @photo_of_current_page_number
	        
        end

        @detail_link_suffix = '/from_fresh'

		check_loading_mode

	end

	private

		def check_loading_mode 
			@content_class = @content_class? @content_class : '';
			render layout: "ajax_page_load" if params[:mode] == 'ajax_page_load'
			render layout: "partial" if params[:mode] == 'partial'
		end

end
