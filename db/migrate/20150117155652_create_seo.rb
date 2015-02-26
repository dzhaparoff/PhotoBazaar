class CreateSeo < ActiveRecord::Migration
  def change
    create_table :seos do |t|
	  t.string :title
      t.string :description
      t.string :keywords
      t.references :resource, polymorphic: true, index: true
    end
  end
end
