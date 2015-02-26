class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
 	    t.string :name
      t.references :photographer, index: true
      t.text :description
      t.string :camera
      t.string :lens
      t.integer :focal_length
      t.integer :iso
      t.integer :shutter_speed
      t.integer :aperture
      t.integer :times_viewed
      t.decimal :rating
      t.timestamp :created_at
      t.references :category, index: true
      t.string :location
      t.decimal :latitude
      t.decimal :longitude
      t.timestamp :taken_at
      t.integer :width
      t.integer :height
      t.integer :votes_count
      t.integer :favorites_count
      t.boolean :nsfw
      t.decimal :highest_rating
      t.integer :license_type
      t.string :original_url
      t.string :local_image_url
      t.string :base_color
      t.string :base_color_name
      t.json :colors

      t.timestamps
    end
  end
end
