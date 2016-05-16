class City < ActiveRecord::Base

  # attr_accessor :name, :country, :general_info1

   # def initialize(name, country, general_info1)
   #    @name = name
   #    @country = country
   #    @general_info1 = general_info1
   #  end

   def self.import(file)
    logger.info "22222222222222222222"
    logger.info file.inspect
    logger.info "22222222222222222222"
    logger.info file.path
    logger.info "22222222222222222222"

    #CSV.foreach(file.path, headers: true) do |row|
      #City.create! row.to_hash
      # puts row[0]
      # puts row[1]
      # puts row[2]
      # logger.info "333333333333333333333"
      # logger.info row.inspect
      # logger.info "333333333333333333333"
      # #City.create!(row.to_hash)
      # City.create!({
      #   name => row[0],
      #   country => row[1],
      #   general_info1 => row[2],
      #   })

      CSV.foreach(file.path, {headers: true, header_converters: :symbol}) do |row|
        City.create!(row.to_hash)
      end
      

    # end
    # csv_text = File.read('cities_csv.csv')
    #   csv = CSV.parse(csv_text, :headers => true)
    #   csv.each do |row|
    #   Moulding.create!(row.to_hash)
    # end
  end

end
