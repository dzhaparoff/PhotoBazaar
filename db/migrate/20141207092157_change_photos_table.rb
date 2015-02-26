class ChangePhotosTable < ActiveRecord::Migration
  def change
  	add_reference(:photos, :camera)
  end
end
