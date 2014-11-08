class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :state, default: "unfinished"
    end
  end
end
