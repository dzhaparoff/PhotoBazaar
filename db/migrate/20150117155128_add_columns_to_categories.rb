class AddColumnsToCategories < ActiveRecord::Migration
  def change
    add_column :categories, :name_l18n, :string
  end
end
