class AddMoreColumnsToCity < ActiveRecord::Migration
  def change
    add_column :cities, :lat, :decimal, :precision => 15, :scale => 13
    add_column :cities, :lng, :decimal, :precision => 15, :scale => 13
  end
end
