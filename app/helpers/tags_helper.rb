module TagsHelper
	def semantic_list_item label, data, suffix
		"<div class=\"item\"><label>#{label}:</label> #{data} <span>#{suffix}</span></div>" if data
	end

	def map_link_tag latitude, longitude
		"<div class=\"item\"><a class=\"map_link_tag\" href=\"#\"><i class=\"marker icon\"></i>Посмотреть на карте</a></div>" unless latitude == nil && longitude == nil
	end
end