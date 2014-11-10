get '/' do
  @wins = Game.games_won.count
  @draws = Game.games_tied.count
  @losses = Game.games_lost.count
  erb :"index"
end

get '/game' do
  erb :"game"
end
