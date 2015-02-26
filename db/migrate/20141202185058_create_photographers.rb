class CreatePhotographers < ActiveRecord::Migration
  def change
    create_table :photographers do |t|
 	    t.string :name
      t.integer :user_id, index: true
      t.string :username
      t.string :firstname
      t.string :lastname
      t.string :fullname
      t.string :city
      t.string :country
      t.string :userpic
      t.string :sex
      t.string :domain
      t.text :description
      t.json :equipment
      t.json :contacts
      t.integer :photos_count
      t.timestamps
    end
  end
end
