class AddColumnsToCity < ActiveRecord::Migration
  def change
    add_column :cities, :webdev_rating, :integer
    add_column :cities, :webdev_shortage, :string
    add_column :cities, :webdev_avg_salary, :integer
    add_column :cities, :gps_coordinates, :string
  end
end
