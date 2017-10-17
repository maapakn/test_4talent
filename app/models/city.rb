class City < ApplicationRecord
  has_many :temperatures

  def temp
    self.temperatures.present? ? self.temperatures.last.temp : nil
  end
end
