class GithubController < ApplicationController
  def repositories
    organization_name = params['organization']

    # begin
    #   # Ideally we should be hitting the database for the repos and only call the API
    #   #   if we couldn't find an existing list of repos for this organization.
    #   #   In the interest of time, I'm going to call the github API directly from the controller.

    # rescue Exception => e
    #   render json: { message: "Something went wrong. Here are some additional details: #{e}"}
    # end

    repositories_raw = Github::RepositoriesImporter.new.import_repositories_for(organization_name)

    repositories = []

    repositories_raw.each do |repo_raw|
      repo = {
        'id' => repo_raw['id'],
        'repoName' => repo_raw['name'],
        'forksCount' => repo_raw['forks_count'],
        'starsCount' => repo_raw['stargazers_count'],
        'contributorsCount' => repo_raw['collaborators_count']
      }

      repositories << repo
    end


    render json: { repositories: repositories, message: 'success' }
  end
end
