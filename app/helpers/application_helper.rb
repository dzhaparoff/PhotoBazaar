module ApplicationHelper
  def cp(path)
    ' current active' if current_page?(path)
  end

  def cat_list
    Category.where('photos_count >= 20').order(sort: :asc).all
  end

  def title(page_title)
    content_for :title, page_title.to_s
  end

  def fresh_photos_count
    interval = APP_CONFIG['fresh_interval']
    day = Date.today

    Photo
      .where(created_at: ((day - interval).beginning_of_day..day.end_of_day))
      .size
  end

  def format_city_country user
    format = ''

    format += " - " if (user.city.size > 0 || user.country.size > 0) unless user.city.nil? && user.country.nil?
    format += "#{user.city.titleize}" if user.city.size > 0 unless user.city.nil?
    format += ", " if (user.city.size > 0 && user.country.size > 0) unless user.city.nil? && user.country.nil?
    format += "#{user.country.titleize}" if ( user.country.size > 0) unless user.city.nil? && user.country.nil?

    format
  end
end