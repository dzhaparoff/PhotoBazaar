class Camera < ActiveRecord::Base
	
has_many :photos
has_one :seo, :as => :resource

validates :name, uniqueness: { case_sensitive: false }

before_create :create_camera_code

  private
    def create_camera_code
      self.code = self.name.parameterize
    end
end
