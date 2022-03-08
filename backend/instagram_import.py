from pprint import pprint
import instagram_scraper

args = {"login_user": "shabanscott", "login_pass": "0muK31Z5S$", "cookiejar":"true"}

insta_scraper = instagram_scraper.InstagramScraper(**args)
insta_scraper.authenticate_with_login()
shared_data = insta_scraper.get_shared_data_userinfo(username='thecryptograph')

arr = []

for item in insta_scraper.query_media_gen(shared_data):
    print(insta_scraper.get_original_image(item))
    insta_scraper.download(item, '../cdn')
    # arr.append(item)
    break

print(arr)