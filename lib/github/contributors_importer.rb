module Github
  # https://api.github.com/repos/Netflix/astyanax/contributors
  class ContributorsImporter
    def import_contributors_for(repository_name, organization_name)
      api = Github::Api.new
      path = "/repos/#{organization_name}/#{repository_name}/contributors"

      raw_response = api.execute(path)
      contributors = parsed_contributors(raw_response)

      contributors
    end

    private

    # Not much parsing needed here since parsed data
    #   is only being used for counting purposes.
    def parsed_contributors(response)
      response.parsed_response
    end
  end
end
