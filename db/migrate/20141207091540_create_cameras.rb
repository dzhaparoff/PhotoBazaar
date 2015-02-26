class CreateCameras < ActiveRecord::Migration
  def change
    create_table :cameras do |t|
    	t.string :name
    	t.string :code
    	t.string :brand
    	t.string :camera_type
    	t.string :lens_mount
    	t.integer :photos_count 
     	t.timestamps
    end
  end
end
