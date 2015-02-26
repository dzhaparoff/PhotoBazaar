class AddDetailsToCategories < ActiveRecord::Migration
  def change
  	add_column :categories, :sort, :integer
  	change_column_default :categories, :sort, 100
  	change_column_default :categories, :photos_count, 0
  	change_column_default :categories, :photos_count, 0
  	change_column_default :categories, :lvl, 1
  end
end
