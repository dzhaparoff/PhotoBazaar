module TagsHelper
	def semantic_list_item label, data, suffix
		"<div class=\"item\"><label>#{label}:</label> #{data} <span>#{suffix}</span></div>" if data.to_s.size > 0
	end

	def map_link_tag latitude, longitude
		"<div class=\"item maplink\"><a class=\"map-link-tag\" data-latitude=\"#{latitude}\" data-longitude=\"#{longitude}\" data-photo=\"photo\" href=\"#\"><i class=\"marker icon\"></i>Посмотреть на карте</a></div>" unless latitude == nil && longitude == nil
	end

	def static_map_tag latitude, longitude, size, zoom
		"<img src=\"https://api.tiles.mapbox.com/v4/edenver.lclgfp63/pin-s+fff(#{latitude},#{longitude})/#{latitude},#{longitude},#{zoom}/#{size}.png?access_token=pk.eyJ1IjoiZWRlbnZlciIsImEiOiIxdU90TFFFIn0.g-uwqqQpGxypPsbyzEFnpw\" class=\"map\" alt=\"map\">" unless latitude == nil && longitude == nil
	end
end