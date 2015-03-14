class CreateBestPhotoOfTheDays < ActiveRecord::Migration
  def change
    create_table :best_photo_of_the_days do |t|
      t.references :photo, index: true
      t.date :day
      t.integer :number
      t.timestamps
    end
  end
end
