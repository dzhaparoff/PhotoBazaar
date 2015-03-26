module TagsHelper
  def semantic_list_item label, data, suffix
    "<div class=\"item\"><label>#{label}:</label> #{data} <span>#{suffix}</span></div>" if data.to_s.size > 0
  end

  def map_link_tag latitude, longitude
    "<div class=\"item maplink\"><a class=\"map-link-tag\" data-latitude=\"#{latitude}\" data-longitude=\"#{longitude}\" data-photo=\"photo\" href=\"#\"><i class=\"marker icon\"></i>Посмотреть на карте</a></div>" unless latitude.nil? && longitude.nil?
  end

  def static_map_tag latitude, longitude, size, zoom
    "<div style=\"background-image: url('https://api.tiles.mapbox.com/v4/edenver.lclgfp63/pin-s+fff(#{latitude},#{longitude})/#{latitude},#{longitude},#{zoom}/#{size}.png?access_token=pk.eyJ1IjoiZWRlbnZlciIsImEiOiIxdU90TFFFIn0.g-uwqqQpGxypPsbyzEFnpw')\" class=\"map\"></div>" unless latitude == nil && longitude == nil
  end

  def show_photo_license(type)
    case type
    when 1
      '<span title="Некоммерческое использование">'\
      '<img src="/images/svg/cc/cc.svg"/>'\
      '<img src="/images/svg/cc/by.svg"/>'\
      '<img src="/images/svg/cc/nc.svg"/>'\
      '</span>'
    when 2
      '<span title="Некоммерческое использование, без производных произведений">'\
      '<img src="/images/svg/cc/cc.svg"/>'\
      '<img src="/images/svg/cc/by.svg"/>'\
      '<img src="/images/svg/cc/nc.svg"/>'\
      '<img src="/images/svg/cc/nd.svg"/>'\
      '</span>'
    when 3
      '<span title="Некоммерческое использование, на тех же условиях">'\
      '<img src="/images/svg/cc/cc.svg"/>'\
      '<img src="/images/svg/cc/by.svg"/>'\
      '<img src="/images/svg/cc/nc.svg"/>'\
      '<img src="/images/svg/cc/sa.svg"/>'\
      '</span>'
    when 4
      '<span title="Атрибуция 3.0">'\
      '<img src="/images/svg/cc/cc.svg"/>'\
      '<img src="/images/svg/cc/by.svg"/>'\
      '</span>'
    when 5
      '<span title="Без производных произведений">'\
      '<img src="/images/svg/cc/cc.svg"/>'\
      '<img src="/images/svg/cc/by.svg"/>'\
      '<img src="/images/svg/cc/nd.svg"/>'\
      '</span>'
    when 6
      '<span title="На тех же условиях">'\
      '<img src="/images/svg/cc/cc.svg"/>'\
      '<img src="/images/svg/cc/by.svg"/>'\
      '<img src="/images/svg/cc/sa.svg"/>'\
      '</span>'
    else
      '<span title="Лицензия сервиса 500px"><img src="/images/svg/cc/500px.svg"/></span>'
    end
  end
end