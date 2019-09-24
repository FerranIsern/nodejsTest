- Node.js technical test -

I used node.js, express.js, request.js and handlebars.js.

I didn't understand how the authentication process had to be implemented, so i ignored that part. The app is initialized
in the app.js file and the index.js file inside the routes folder functions as a controller for the project.

I know it's not properly structured but i had to do it fast because of a lack of time on my side.

- Instructions -

1- After cloning/downloading the project run the console command "npm i" inside its folder to install all the dependencies.
2- From the project's folder now run "node bin www" and the service starts.
3- Navigate to localhost:8000.
4- You should see 4 buttons:
	Clients by Id shows a list of clients sorted by ID and gives you the option to filter them by ID.
	Clients by Nameshows a list of clients sorted by Name and gives you the option to filter them by name.
	Policies by Username allows you to write a username and it shows you the policies linked to that user.
	User of Policy allows you to write a policy ID and see what user is assigned to that.
