class ChangeColumnsToCity < ActiveRecord::Migration
  def change
    remove_column :cities, :webdev_shortage
  end
end
