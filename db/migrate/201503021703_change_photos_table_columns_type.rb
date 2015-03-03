class ChangePhotosTableColumnsType < ActiveRecord::Migration
  def change
  	change_table :photos do |p|
  		p.change :focal_length, :string
  		p.change :iso, :string
  		p.change :shutter_speed, :string
  		p.change :aperture, :string
  		p.change :latitude, :string
  		p.change :longitude, :string
  	end
  end
end
