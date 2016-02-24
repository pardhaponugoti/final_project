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

ActiveRecord::Schema.define(version: 20160224175239) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "reviews", force: :cascade do |t|
    t.integer "author_id",       null: false
    t.integer "subscription_id", null: false
    t.integer "rating",          null: false
    t.text    "comment"
  end

  add_index "reviews", ["author_id"], name: "index_reviews_on_author_id", unique: true, using: :btree
  add_index "reviews", ["subscription_id"], name: "index_reviews_on_subscription_id", unique: true, using: :btree

  create_table "subscriptions", force: :cascade do |t|
    t.string   "name",        null: false
    t.string   "url",         null: false
    t.text     "description", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "subscriptions", ["url"], name: "index_subscriptions_on_url", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                                                                                 null: false
    t.string   "password_digest",                                                                       null: false
    t.string   "session_token",                                                                         null: false
    t.string   "location"
    t.date     "date_of_birth"
    t.datetime "created_at",                                                                            null: false
    t.datetime "updated_at",                                                                            null: false
    t.string   "first_name",                                                                            null: false
    t.string   "last_name",                                                                             null: false
    t.string   "image",           default: "http://www.clipartbest.com/cliparts/McL/G6G/McLG6G9ki.png", null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
