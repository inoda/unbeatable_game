require 'spec_helper'

describe 'MainController' do
  describe "GET '/'" do
    it "loads the homepage" do
      get '/'
      expect(last_response).to be_ok
    end
  end

  describe "GET '/game'" do
    it "loads the game page" do
      get '/game'
      expect(last_response).to be_ok
    end
  end  
end