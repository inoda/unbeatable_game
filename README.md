unbeatable_game
===============
An unbeatable Tic-Tac-Toe game [deployed on Heroku](http://tic-tac-no.herokuapp.com/). I use Sinatra as a server; all it really does is render two pages (the homepage and the game page) and stores game results (AI wins, losses, and draws).

All of the game logic is on the front-end (encapsulated in JavaScript objects with a few standalone functions), which makes the AI response feel really snappy. When the game is over, an AJAX request is sent out to report the game's result.

The first thing I did was write the little server side logic I needed, and begin organizing my JavaScript objects in a way that I thought made sense. After I got to a point where I could play tic-tac-toe against a really, really stupid AI, I dove into making it smarter.

Figuring out how the AI should pick its next move was actually relatively easy. After researching the problem, it became clear that the [minimax algorithm](http://en.wikipedia.org/wiki/Minimax) was the best route (more resources I used are listed below). In a nutshell, minimax creates all possible game states that could arise from the current one, up to a certain depth (one move ahead? two moves ahead?). Then, each possible game state is scored based on a rough heuristic (a win for the AI has the highest score, letting the player win has the lowest score, etc.). From there, picking the best next move is just a matter of comparing scores.

Implementing the minimax algorithm was tough. I spent two-and-a-half days reading about it, watching videos about it, and tentatively hacking out just that part. I even considered falling back on a [rule-based system](http://www.gadberry.com/aaron/2006/01/26/rule-based-tic-tac-toe/) near the end of day two, but decided that was too brute-forcey, and quite frankly, a cop out.

By the end of day two, I had a slightly smarter AI. My minimax scoring was working, but only at one level deep. So, if I played with a strategy that required the AI to think two moves ahead, I could beat it. I spent half a day working this kink out (it turned out to be a bookkeeping issue \*facepalm*).

The rest of the time was spent refactoring code, polishing the UI, and double checking my tests.

Don't let the short and clean commit history fool you - this was a definitely a challenge. I had fun in the process (ok, maybe not so much at the end of day two), and learned more than just how to implement minimax (like how to spy on functions with Jasmine).

## Getting Started
#### Requirements
* Ruby 2.1.3
* Bundler 1.7.x

#### Up And Running
##### Just HTML, JS, and CSS (AJAX request and record keeping will not work)
* Clone this repository
* Open game.html in the app/views/dev directory 

##### On The Web
* Clone this repository
* Run `bundle install`
* Run `bundle exec rake db:create` and `bundle exec rake db:migrate`
* Run `bundle exec shotgun`
* Go to [http://localhost:9393/](http://localhost:9393/) in your browser

#### Running Tests
* To run all RSpec tests
   * Run `bundle exec rake db:test:prepare`
   * Run `bundle exec rspec .`
* To run all Jasmine tests
   * Run `jasmine init`
   * Run `bundle exec rake jasmine`
   * Go to go to [http://localhost:8888/](http://localhost:8888/) in your browser

## Technologies Used
* [Sinatra](http://www.sinatrarb.com/)
* PostgreSQL + ActiveRecord
* JavaScript + jQuery 1.9.x
* RSpec
* Jasmine
* Heroku (and kept awake by [Kaffeine](http://kaffeine.herokuapp.com/))

## Resources That Helped Alot
* [http://en.wikipedia.org/wiki/Minimax](http://en.wikipedia.org/wiki/Minimax)
* [http://www.neverstopbuilding.com/minimax](http://www.neverstopbuilding.com/minimax)
* [https://www.youtube.com/watch?v=6kFKnB6JtcY](https://www.youtube.com/watch?v=6kFKnB6JtcY)
* [http://www.youtube.com/watch?v=HFFKcP_olV0](https://www.youtube.com/watch?v=HFFKcP\_olV0)