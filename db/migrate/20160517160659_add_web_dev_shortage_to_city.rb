class AddWebDevShortageToCity < ActiveRecord::Migration
  def change
    add_column :cities, :web_dev_shortage, :integer
  end
end
