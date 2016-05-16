class CreateCities < ActiveRecord::Migration
  def change
    create_table :cities do |t|
      t.string :name
      t.string :country
      t.string :general_info1
      t.string :general_info2
      t.integer :happiness_rating
      t.integer :family_safety_rating
      t.string :family_safety_info
      t.integer :bike_hobby_rating
      t.string :bike_hobby_info
      t.integer :accountant_rating
      t.integer :accountant_shortage_rating
      t.string :accountant_shortage
      t.integer :accountant_avg_salary
      t.integer :graphic_designer_rating
      t.string :graphic_designer_shortage
      t.integer :graphic_designer_avg_salary
      t.integer :journalist_rating
      t.string :journalist_shortage
      t.integer :journalist_avg_salary

      t.timestamps null: false
    end
  end
end
