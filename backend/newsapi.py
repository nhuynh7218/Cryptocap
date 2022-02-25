from newsapi import NewsApiClient

news_api_key = ''

# Init
newsapi = NewsApiClient(api_key=news_api_key)

# /v2/get_everything
sources = newsapi.get_everything(q='crypto', page=1, page_size=5)
posts = sources['articles']

for post in posts:
  print("Title:", post['title'].lower())
  print("Description:", post['description'])
  print("Image:", post['urlToImage'])
  print("Published:", post['publishedAt'])
  print("Source:", post['source']['name'])
  print("Content:", post['content'])
  print('URL: ', post['url'])
  break

# import posts in MongoDB

# cron job every 5min?
# check if post exist in DB, if URL equals URL do not import.
