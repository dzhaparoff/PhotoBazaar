class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    
    @user = User.from_omniauth(request.env["omniauth.auth"])

     if @user.photographer == nil then 
          auth = request.env["omniauth.auth"]
          
          photographer = Photographer.find_or_create_by(username: auth.info.email)
          photographer.user_id = @user.id
          photographer.name = auth.info.nickname
          photographer.firstname = auth.info.first_name
          photographer.lastname = auth.info.last_name
          photographer.fullname = auth.info.name
          photographer.city = auth.info.location

          userpic_file = '/images/userpic_' + auth.uid + '.jpg'
            userpic_exist = File.exist?('public' + userpic_file)   
            
            if !userpic_exist
              open('public' + userpic_file, 'wb') do |file|
                file << open( auth.info.image.gsub("­http","htt­ps") ).read
              end
            end

          photographer.userpic = userpic_file

          photographer.save

          @user.photographer_id = photographer.id

          @user.save

      end

    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
      set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end

  end

  def vkontakte
    
    @user = User.from_omniauth_vk(request.env["omniauth.auth"])

     if @user.photographer == nil then 
          auth = request.env["omniauth.auth"]
          
          photographer = Photographer.find_or_create_by(username: auth.info.email)
          photographer.user_id = @user.id
          photographer.name = auth.info.nickname
          photographer.firstname = auth.info.first_name
          photographer.lastname = auth.info.last_name
          photographer.fullname = auth.info.name
          photographer.city = auth.info.location

          userpic_file = '/images/userpic_' + auth.uid + '.jpg'
            userpic_exist = File.exist?('public' + userpic_file)   
            
            if !userpic_exist
              open('public' + userpic_file, 'wb') do |file|
                file << open( auth.info.image.gsub("­http","htt­ps") ).read
              end
            end

          photographer.userpic = userpic_file

          photographer.save

          @user.photographer_id = photographer.id

          @user.save

      end

    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
      set_flash_message(:notice, :success, :kind => "Vkontakte") if is_navigational_format?
    else
      session["devise.vkontakte_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end

  end
end