class Game < ActiveRecord::Base
  before_save :check_if_valid_state

  def check_if_valid_state
    if !valid_states.include? state
      raise "Valid states are: #{valid_states.join(',')}" 
    end
  end

  def draw
    update_attributes(state: 'draw')
  end

  def computer_loss
    update_attributes(state: 'computer_loss')
  end

  def computer_win
    update_attributes(state: 'computer_win')
  end

  def finished?
    state != 'unfinished'
  end

  private 

  def valid_states
    ['unfinished', 'computer_win', 'computer_loss', 'draw']
  end
end
