

# https://cryptocap.digital/callback?code=027516fc91d91320a79582ab3d49c3700ed9027294c01065c779ac31b797e69d



curl https://api.coinbase.com/oauth/token \
  -X POST \
  -d 
'
  grant_type=authorization_code
  &code=027516fc91d91320a79582ab3d49c3700ed9027294c01065c779ac31b797e69d
  &client_id=a412eac363577edbeff9d3b126a0168a83d5366fa2056893ec84a5eb8e3daf49
  &client_secret=31eebc115cc456c40c24ae8f24186f868fbe815dcbdb29f72a034db82946b0a4
'

from .oauth import BaseOAuth2


class CoinbaseOAuth2(BaseOAuth2):
    name = 'coinbase'
    SCOPE_SEPARATOR = '+'
    DEFAULT_SCOPE = ['user', 'balance']
    AUTHORIZATION_URL = 'https://www.coinbase.com/oauth/authorize'
    ACCESS_TOKEN_URL = 'https://api.coinbase.com/oauth/token'
    REVOKE_TOKEN_URL = 'https://api.coinbase.com/oauth/revoke'
    ACCESS_TOKEN_METHOD = 'POST'
    REDIRECT_STATE = False

    def get_user_id(self, details, response):
        return response['data']['id']

    def get_user_details(self, response):
        """Return user details from Coinbase account"""
        user_data = response['data']
        email = user_data.get('email', '')
        name = user_data['name']
        username = user_data.get('username')
        fullname, first_name, last_name = self.get_user_names(name)
        return {'username': username,
                'fullname': fullname,
                'first_name': first_name,
                'last_name': last_name,
                'email': email}

    def user_data(self, access_token, *args, **kwargs):
        """Loads user data from service"""
        return self.get_json('https://api.coinbase.com/v2/user',
                headers={'Authorization': 'Bearer ' + access_token})