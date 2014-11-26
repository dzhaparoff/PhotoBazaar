class ColorChecker  
    
   def initialize(hash)
     @file = hash[:file]
     @count = hash[:count] 
     if defined? hash[:count]
         Miro.options[:color_count] = hash[:count] 
     else 
         Miro.options[:color_count] = 5 
     end
   end

  attr_accessor :file, :color_count
    
  def check        
         
     if defined? @file
        colors = Miro::DominantColors.new(@file)
        color = []
         colors.to_hex.each do |c|
             colorName = ColorNamer.name_from_html_hash( c )
             color << {hexOriginal: c, hex: '#'+colorName[0], colorName: colorName[1].to_sym, colorShade: colorName[2].to_sym}           
         end         
        return color
     else
        return Array.new
     end     
       
  end
    
end