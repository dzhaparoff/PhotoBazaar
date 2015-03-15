class MainpageController < ApplicationController
   
   def index
   		photo_of_the_day = BestPhotoOfTheDay.last
   		@best_photo_of_day = photo_of_the_day.photo
   		@best_photo_of_day_number =photo_of_the_day.number
   end
   
end