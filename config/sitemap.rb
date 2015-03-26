# Change this to your host. See the readme at https://github.com/lassebunk/dynamic_sitemaps
host "photobazaar.ru"

sitemap :site do
  url root_url, last_mod: Time.now, change_freq: "daily", priority: 1.0
  url fresh_photos_page_url, last_mod: Time.now, change_freq: "daily", priority: 1.0
  url photos_of_the_day_page_url, last_mod: Time.now, change_freq: "daily", priority: 1.0
end

sitemap_for Category.all, name: :categories do |category|
  url categories_url(category.code), last_mod: (!category.photos.order(created_at: :desc).first.nil? ? category.photos.order(created_at: :desc).first.updated_at : Time.now), change_freq: "daily", priority: 0.9
end

sitemap_for Photo.all, name: :photos do |photo|
  url photo_page_url(photo.id), last_mod: photo.updated_at, change_freq: "monthly", priority: 0.8
end

ping_with "http://photobazaar.ru/sitemap.xml"