module MetaHelper
	def meta_description photo

		description = String.new
        
        user = photo.photographer

		description += "Фотограф: #{user.fullname.titleize}"
		
		description += " - " if ( user.city.size > 0 || user.country.size > 0 ) unless user.city.nil? && user.country.nil?
		description += "#{user.city.titleize}" if ( user.city.size > 0 ) unless user.city.nil?
		description += ", " if ( user.city.size > 0 && user.country.size > 0) unless user.city.nil? && user.country.nil?
		description += "#{user.country.titleize}" if ( user.country.size > 0) unless user.city.nil? && user.country.nil?

		description += ".
";

		description += "Камера: #{photo.camera.name}" unless photo.camera_id.nil?
		description += ", объектив: #{photo.lens}" if photo.lens.size > 0 unless photo.lens.nil?
		description += ", iso: #{photo.iso}" if photo.iso.size > 0 unless photo.iso.nil?
		description += ", выдержка: #{photo.shutter_speed}" if photo.shutter_speed.size > 0 unless photo.shutter_speed.nil?
		description += ", диафрагма: #{photo.aperture}" if photo.aperture.size > 0 unless photo.aperture.nil?

		description += "
";

		description += "PhotoBazaar.ru - лучшие фотографии со всего мира каждый день"
		
	end
end