class ColorChecker  
  attr_accessor :file, :count

  def initialize(hash)
    @file = hash[:file]
    @count = hash[:count]
    if defined? hash[:count]
      Miro.options[:color_count] = hash[:count]
    else
      Miro.options[:color_count] = 5
    end
      Miro.options[:resolution] = '150x150'
      Miro.options[:method] = 'histogram'
  end
    
  def check
    if defined? @file
      colors = Miro::DominantColors.new(@file)
      color = []
      colors.to_hex.each do |c|
        color_name = ColorNamer.name_from_html_hash(c)
        color << {
          hexOriginal: c,
          hex: '#' + color_name[0],
          colorName: color_name[1].to_sym,
          colorShade: color_name[2].to_sym
        }
      end
      return color
    else
      return []
    end
  end
end
