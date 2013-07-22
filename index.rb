require 'sinatra/base'


class Server < Sinatra::Base
	get '/' do
		send_file 'index.html'
	end
end