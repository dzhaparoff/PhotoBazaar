class ChangePhotosMigration < ActiveRecord::Migration
  def change
  	add_attachment :photos, :thumbnails
  end
end
