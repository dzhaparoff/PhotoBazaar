class Photo < ActiveRecord::Base
	belongs_to :photographer
	belongs_to :category
	belongs_to :camera

  has_one :seo, :as => :resource

	has_attached_file :thumbnails,
    :styles => {
      :thumb =>  "100x100#",
      :small  => "150x150#",
      :medium => "300x300#",
      :big    => "600x600",
      :compressed => "2048x2048>"
  	 },
  	 :convert_options => {
       :all => "-quality 75 -strip",
       :compressed => "-quality 65" 
     }

  	 do_not_validate_attachment_file_type :thumbnails

  	 validates :photo_id, uniqueness: { case_sensitive: false }

  self.per_page = 21

  default_scope {
   order(created_at: :desc)
  }

  scope :best_photos_of_the_day, -> (day) {
      unscope(:order).where(:created_at => (day.beginning_of_day .. day.end_of_day)).order(highest_rating: :desc, created_at: :desc)
  }

  scope :first_photo, -> {
      unscope(:order).order(created_at: :asc).select(:created_at).first
  }

  scope :publish_dates_count, -> {
      unscope(:order).select("date(created_at)").uniq.count
  }

  scope :publish_dates, -> {
      unscope(:order).select("date(created_at) as publish_date").uniq
  }

  scope :best_photo_in_category, -> (category_id) {
      unscope(:order).where(category_id: category_id).order(rating: :desc, width: :desc, created_at: :desc, highest_rating: :desc, votes_count: :desc, favorites_count: :desc ).first
  }

  def self.search(search)
      unscope(:order).where('name LIKE ?', "%#{search}%")
  end

end