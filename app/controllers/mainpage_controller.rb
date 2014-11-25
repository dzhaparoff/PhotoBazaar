class MainpageController < ApplicationController
   def index
       require 'colors.rb'      
       colors = ColorChecker.new(:count => 3)
       
       colorsa = []
      
        colors.file = 'http://amt11223344.tmweb.ru/bitrix/templates/amt/images/category-icon/cat-ico-04.png'
          colorsa <<  colors.check
       
        colors.file = 'http://www.plazmasvet.com/img/bann/artsheving_k1.jpg'
          colorsa <<  colors.check
       
       @colors = colorsa
       
    end
end