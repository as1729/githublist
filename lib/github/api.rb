module Github
  class Api
    include HTTParty
    base_uri 'https://api.github.com'

    UNAUTHENTICATED_REQUEST_HOURLY_RATE_LIMIT = 60.freeze

    def execute(path)
      if rate_limit_exceeded?
        raise 'Exceeded Rate limit. Please wait an hour and try again.'
        return
      end

      self.class.get(path)
    end

    private
    def rate_limit_exceeded?
      # We are setting two cache keys here since I have not implemented redis as the cache store.
      # The ideal solution would be to have an increment/decrement cache that has an expiration set.
      if Rails.cache.fetch('/github/api_call_start_time').present?
        count_of_calls = Rails.cache.fetch('/github/api_call_count')
      else
        Rails.cache.write('/github/api_call_start_time', Time.zone.now, expires_in: 1.hour)
        Rails.cache.write('/github/api_call_count', 1)
        count_of_calls = 1
      end

      if count_of_calls > UNAUTHENTICATED_REQUEST_HOURLY_RATE_LIMIT
        return true
      end

      return false
    end
  end
end
