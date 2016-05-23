class AddMoreMoreColumnsToCity < ActiveRecord::Migration
  def change
    add_column :cities, :cost_of_living, :integer
    add_column :cities, :salary_vs_col, :integer
  end
end
