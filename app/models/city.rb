class City < ApplicationRecord
  has_many :temperatures

  def temp
    if self.temperatures.present?
      return self.temperatures.last.temp
    else
      return nil
    end
  end
end
