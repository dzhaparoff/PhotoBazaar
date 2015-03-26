class Seo < ActiveRecord::Base	
  belongs_to :resource, polymorphic: true
end
