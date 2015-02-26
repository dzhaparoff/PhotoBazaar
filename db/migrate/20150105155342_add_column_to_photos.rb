class AddColumnToPhotos < ActiveRecord::Migration
  def change
  	add_column :photos, :photo_id, :integer
  end
end
