# README

The githublist app does the following

1. Retrieves a list of repository data for any given Organization from Github.
2. Allows the user to sort the repositories by stars, contributors, and forks.
3. Ensures it does not exceed the Github API rate limit.

## Running Locally

### Ruby Version
I would recommend using rvm as your ruby version manager. This should take care of having you install the right ruby version.

Ruby 2.5.5 is being used for this project


### Rails Version
5.2.1

### API
The project uses the unauthenticated version of the github API so no keys/usernames/etc required here.

### Database

#### Note
There are no database tables created for this project. Doing the below will still be necessary to deploy the application to Heroku or run locally.

#### Creation

1. Make sure you have postgres installed on the system.
2. run `rake db:create` to create the `githublist_developtment` database.
3. run `rake db:migrate` to make sure all the tables get populated.
4. run `rake db:seed` to make sure all the states are populated
4. seed the database with the following data. You may do this via a `rails console`


#### Initialization
1. make sure database is accessible via port 5432 (this is the default) when to have postgres running.


## Production Information

## Hosting
Project is hosted on heroku at `https://sleepy-coast-82100.herokuapp.com/`. May take a second to load or return your api request as it is on Hobby tier.

## How to test?
1. Enter the name `TheAlgorithms` into the input field.
2. Wait until repository results populate in the screen.
3. Choose the various `Sort!` buttons to check if the data is being sorted as expected.

## TODO Items To make this more scalable
1. This implementation does not support large companies with more than 59 repositories as once it hits the rate limit app will raise an exception.
2. There should be an intermediary state that will store the repository data for large organizations and do the calls to contributors separately. When we hit the rate limit, we will try again in an hour automatically rather than just losing the data.
3. With Point 2, we would be able to show all the information except collaborator count which at least offers partial information to the user while their contributor data is loading.
4. Needs tests. Not much more to say here.
5. Better display of loading, success, and error states in the front-end so user is not clicking the button multiple times.
