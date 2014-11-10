get '/' do
  @wins = Game.games_won.count
  @draws = Game.games_tied.count
  @losses = Game.games_lost.count
  erb :"index"
end

get '/game' do
  erb :"game"
end

post '/game' do
  game = Game.create!

  if params[:results] == 'X'
    game.computer_loss
  elsif params[:results] == 'O'
    game.computer_win
  else
    game.draw
  end
end