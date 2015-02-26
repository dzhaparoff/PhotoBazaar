require 'test_helper'

class ImagesControllerTest < ActionController::TestCase
  test "should get get_top_fl" do
    get :get_top_fl
    assert_response :success
  end

  test "should get get_top_fh" do
    get :get_top_fh
    assert_response :success
  end

end
