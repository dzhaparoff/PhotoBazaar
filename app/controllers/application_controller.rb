class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  after_filter :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  def hex_to_rgba(hex_color, opacity)
    rgba_color = []
    rgba_color << hex_color[1..2].to_i(16)
    rgba_color << hex_color[3..4].to_i(16)
    rgba_color << hex_color[5..6].to_i(16)

    rgba_color * ',' + ',' + opacity.to_s
  end

  private
  
  def record_not_found
    render text: '404 страница не найдена', status: 404
  end

  protected

  def verified_request?
    super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
  end
end
