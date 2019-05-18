module Github
  # https://api.github.com/orgs/netflix/repos
  # We are calling this class Repositories Importer since ideally we will be importing
  #   the API data and storing it somewhere for future use. As for now its going to just
  #   displaying the data and the functionality for saving into a database will be implemented
  #   in the future.
  class RepositoriesImporter
    def import_repositories_for(organization_name)
      api = Github::Api.new
      path = "/orgs/#{organization_name}/repos"

      raw_response = api.execute(path)
      repositories = parsed_repositories(raw_response)

      repositories.each do |repository|
        contributors = get_contributor_count_for_repo(repository, organization_name)
        repository['collaborators_count'] = contributors.count
      end

      repositories
    end

    private
    def parsed_repositories(response)
      response.map { |repo| repo.slice('id', 'name', 'collaborators_url', 'forks_count', 'stargazers_count') }
    end

    def get_contributor_count_for_repo(repository, organization_name)
      Github::ContributorsImporter.new.import_contributors_for(repository['name'], organization_name)
    end
  end
end
