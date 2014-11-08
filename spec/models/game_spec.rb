require_relative '../spec_helper'

describe Game do
  let(:game) { Game.create! }

  describe "initialization" do
    it "begins with state: 'unfinished'" do
      expect(game.state).to eq 'unfinished'
    end
  end

  describe "setting game to an invalid state" do
    it "raises an error" do
      expect{ game.update_attributes(state: 'this is not a valid state') }.to raise_error
    end
  end  

  describe "#draw" do
    it "sets the game state to a draw" do
      game.draw
      expect(game.state).to eq 'draw'
    end
  end

  describe "#computer_win" do
    it "sets the game state to a win for the computer" do
      game.computer_win
      expect(game.state).to eq 'computer_win'
    end
  end

  describe "#computer_loss" do
    it "sets the game state to a loss for the computer" do
      game.computer_loss
      expect(game.state).to eq 'computer_loss'
    end
  end

  describe "#finished?" do
    it "returns true if the game is finished" do
      game = Game.create!(state: 'draw')
      expect(game.finished?).to eq true
    end

    it "returns false if the game is unfinished" do
      expect(game.finished?).to eq false
    end
  end  
end