class BestPhotoOfTheDay < ActiveRecord::Base
  belongs_to :photo, inverse_of: :best_photo_of_the_day
  self.per_page = 31
end
