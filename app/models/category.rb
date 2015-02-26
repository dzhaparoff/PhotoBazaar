class Category < ActiveRecord::Base
	has_many :photos
	has_one :seo, :as => :resource
end
