class Admin::Api::PhotosController < Admin::AdminController

  def index
    photos = Photo.order('id').all
    render json: photos
  end

  def show
    @photo = Photo.where(id: params[:id]).take
    render json: @photo
  end

  def new
    @photo = Photo.new
    render json: @photo
  end

  def edit

  end

  def create
    require 'colors.rb'
    require 'open-uri'

    photo = Photo.new(photo_params)

    response = F00px.get('photos/' + photo_params[:photo_id].to_s, 'image_size' => '2048')
    response_hash = JSON.parse(response.body)

    doc_href = 'https://500px.com' + response_hash['photo']['url']
    doc = Nokogiri::HTML(open(doc_href))
    img_url = doc.css('meta[property="og:image"]').first
    response_hash['photo']['image_url'] = img_url['content']
    
    params['image_url'] = response_hash['photo']['image_url']

    colors = ColorChecker.new(count: 6)

    unless File.exist?('public' + params['local_image_url'])
      open('public' + params['local_image_url'], 'wb') do |file|
        file << open(params['image_url']).read
      end
    end

    colors.file = 'public' + params['local_image_url']
    checked_colors = colors.check
    photo['colors'] = checked_colors
    photo['base_color'] = checked_colors[0][:hexOriginal]
    photo['base_color_name'] = checked_colors[0][:colorName]

    photo.thumbnails = URI.parse(params['image_url'])

    if photo.save
      render json: photo
    else
      photo = Photo.find_by_photo_id(photo_params[:photo_id])
      render json: photo
    end
  end

  def update

  end

  def destroy
    photo = Photo.where(id: params['id']).take
    photo.destroy
    render json: photo
  end

  private

  def photo_params
    params
      .require(:photo)
      .permit(:name,
              :thumbnails,
              :photographer_id,
              :description,
              :camera_id,
              :category_id,
              :photo_id,
              :lens,
              :focal_length,
              :iso,
              :shutter_speed,
              :aperture,
              :times_viewed,
              :rating,
              :location,
              :latitude,
              :longitude,
              :taken_at,
              :width,
              :height,
              :votes_count,
              :favorites_count,
              :nsfw,
              :highest_rating,
              :license_type,
              :original_url,
              :local_image_url,
              :base_color,
              :base_color_name,
              :colors)
  end
end
