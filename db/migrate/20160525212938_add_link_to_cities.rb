class AddLinkToCities < ActiveRecord::Migration
  def change
    add_column :cities, :link, :string
  end
end
