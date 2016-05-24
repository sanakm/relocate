# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160520102114) do

  create_table "cities", force: :cascade do |t|
    t.string   "name"
    t.string   "country"
    t.string   "general_info1"
    t.string   "general_info2"
    t.integer  "happiness_rating"
    t.integer  "family_safety_rating"
    t.string   "family_safety_info"
    t.integer  "bike_hobby_rating"
    t.string   "bike_hobby_info"
    t.integer  "accountant_rating"
    t.integer  "accountant_shortage_rating"
    t.string   "accountant_shortage"
    t.integer  "accountant_avg_salary"
    t.integer  "graphic_designer_rating"
    t.string   "graphic_designer_shortage"
    t.integer  "graphic_designer_avg_salary"
    t.integer  "journalist_rating"
    t.string   "journalist_shortage"
    t.integer  "journalist_avg_salary"
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
    t.integer  "webdev_rating"
    t.integer  "webdev_avg_salary"
    t.string   "gps_coordinates"
    t.integer  "web_dev_shortage"
    t.decimal  "lat",                         precision: 15, scale: 13
    t.decimal  "lng",                         precision: 15, scale: 13
    t.string   "code"
    t.integer  "cost_of_living"
    t.integer  "salary_vs_col"
  end

end
