class Photo < ActiveRecord::Base
	belongs_to :photographer
	belongs_to :category
  belongs_to :camera
	has_one :best_photo_of_the_day, inverse_of: :photo

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
       :compressed => "-quality 75" 
     }

  	 do_not_validate_attachment_file_type :thumbnails

  	 validates :photo_id, uniqueness: { case_sensitive: false }

    before_save :extract_dimensions
    after_save :check_best_photo

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

  def next_in_cat
    self.class.unscope(:order).where("id > ? AND category_id = ?", id, category_id).first
  end

  def previous_in_cat
    self.class.unscope(:order).where("id < ? AND category_id = ?", id, category_id).last
  end

  def next_in_user
    self.class.unscope(:order).where("id > ? AND photographer_id = ?", id, photographer_id).first
  end

  def previous_in_user
    self.class.unscope(:order).where("id < ? AND photographer_id = ?", id, photographer_id).last
  end

  def next_in_fresh
    day = Date.today
    interval = APP_CONFIG['fresh_interval']
    self.class.unscope(:order).where(:created_at => ((day-interval).beginning_of_day .. day.end_of_day)).where("created_at > ?", created_at).first
  end

  def previous_in_fresh
    day = Date.today
    interval = APP_CONFIG['fresh_interval']
    self.class.unscope(:order).where(:created_at => ((day-interval).beginning_of_day .. day.end_of_day)).where("created_at < ?", created_at).last
  end

  def next_in_bpod
    bpod_next = BestPhotoOfTheDay.where("day > ?", self.created_at.to_date).first
    self.class.where(id: bpod_next.photo.id).take unless bpod_next.photo.nil? unless bpod_next.nil?
  end

  def previous_in_bpod
    bpod_pre = BestPhotoOfTheDay.where("day < ?", self.created_at.to_date).last
    self.class.where(id: bpod_pre.photo.id).take unless bpod_pre.photo.nil? unless bpod_pre.nil?
  end

  private

      def extract_dimensions

          tempfile = "public/" + self.local_image_url

          unless tempfile.nil?
              geometry = Paperclip::Geometry.from_file(tempfile)
              self.width = geometry.width.to_i
              self.height = geometry.height.to_i
          end

      end

      def check_best_photo

         if self.created_at.nil? then
            date = Date.today
         else
            date = self.created_at
         end

         best_photo_of_day = Photo.best_photos_of_the_day(date).take
         first_photo_day   = Photo.first_photo.created_at.to_date
         best_photo_of_day_number = (date.to_date - first_photo_day).to_int

         if best_photo_of_day.nil? then

            best_photo = BestPhotoOfTheDay.new

            best_photo.photo_id = self.id
            best_photo.number = best_photo_of_day_number
            best_photo.day = date

            best_photo.save

         else

            if BestPhotoOfTheDay.where(number: best_photo_of_day_number).take.nil? then

                  best_photo = BestPhotoOfTheDay.new

                  best_photo.photo_id = self.id
                  best_photo.number = best_photo_of_day_number
                  best_photo.day = date

                  best_photo.save

            else

                if self.highest_rating > best_photo_of_day.highest_rating && date > best_photo_of_day.created_at then

                  BestPhotoOfTheDay.where(number: best_photo_of_day_number).first_or_create do |best_photo|

                      best_photo.photo_id = self.id
                      best_photo.number = best_photo_of_day_number
                      best_photo.day = date

                      best_photo.save

                  end

                end

            end

         end

      end

end