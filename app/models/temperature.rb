class Temperature < ApplicationRecord
  after_create :to_celsius
  belongs_to :city

  def to_celsius
    kelvin_temp = self.temp
    kelvin_temp_min = self.temp_min
    kelvin_temp_max = self.temp_max
    self.temp_min = (kelvin_temp_min.to_f-272.15).round(2)
    self.temp_max = (kelvin_temp_max.to_f-272.15).round(2)
    self.temp = (kelvin_temp.to_f-272.15).round(2)
    self.save
  end
end
