class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
  	  t.string :name
      t.string :code, index: true
      t.integer :cat_id
      t.integer :photos_count
      t.integer :parent_id, index: true
      t.boolean :subcategory
      t.integer :lvl
      t.text :description
      t.timestamps   
    end
  end
end
