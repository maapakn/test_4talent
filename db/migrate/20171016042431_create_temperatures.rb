class CreateTemperatures < ActiveRecord::Migration[5.1]
  def change
    create_table :temperatures do |t|
      t.references :city, foreign_key: true
      t.float :temp
      t.float :pressure
      t.integer :humidity
      t.float :temp_min
      t.float :temp_max

      t.timestamps
    end
  end
end
