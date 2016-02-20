from facepy import GraphAPI
import json
from facepy import utils,OAuthError


access_token = utils.get_application_access_token('508385019364150', '22e4fc5b8e6bd6e086adcb9f3e1730d8')
group_id = "508035479308296" #"SyrianHomeBerlin"
name = "syrianHomeBerlin"
# mussabs access token
#access_token = "CAACEdEose0cBAKqcuFFVO1xMgp25Q68NWxgoZBweA1Y5ZC2eb6ZCZCggiavHLyG6xL0ZCpa3XrklezR5ALgQqMSZCFo88WTJ5NEK6ZA6CubVWXWN2MZCWZBAjXitpR25YWYK9iRuzKhYGIeibnvAglSnZBscDGFuVwzdAZC0C5l0qGsxsw7af9hMOocP1vl2cK49HJGZBhkUW0yyHAZDZD"

group_id = "542747389189895" #open group "deutschland in arabisch"
name = "deutschland in arabisch"

group_id = "312084075648387" #open group "deutschland in arabisch"
name = "syrienindeutschland"

def getsizes(uri):
    #taken from http://stackoverflow.com/questions/7460218/get-image-size-without-downloading-it-in-python
    import urllib
    from PIL import ImageFile
    # get file size *and* image size (None if not known)
    file = urllib.request.urlopen(uri)
    size = file.headers.get("content-length")
    if size: size = int(size)
    p = ImageFile.Parser()
    while 1:
        data = file.read(1024)
        if not data:
            break
        p.feed(data)
        if p.image:
            return size, p.image.size
            break
    file.close()
    return size, None

#group_id = "558730190825465" # "closed tango osnabrueck page"
#access_token = "CAACEdEose0cBANHdoFGxalAUzfkIZBmGUwIJ7xzBLjVxgMXOHa9UhZA1EyeOcWL0bIcMghUihjgBLrqOlT7ZBn32v6cLB8PPJYPxmGEpKp7uzYB6gxZBTZC69OaSaEwfFDJr9VWzHrE2CQvdtraxDVIvOqBP5TgcuQnQOi6BFu6ZCcp2xMjf8YZCz8sCuohl7GMlFH4XXhOuTGv4t7q55sW"


graph = GraphAPI(access_token)

# https://facepy.readthedocs.org/en/latest/usage/graph-api.html
page_gen= graph.get(group_id + "/feed?fields=id,message,full_picture,shares,created_time,likes.limit(0).summary(true),comments.limit(0).summary(true)", 
                     page=True, retry=3, limit=500)




data = []
try:

    for data_raw in page_gen:
            print("page found...")
            for k,v in enumerate(data_raw["data"]):
                if "full_picture" in v.keys():
                    try:
                        sizes = getsizes(v["full_picture"])[1]
                    except:
                        sizes = (-1,-1)
                    data.append({
                        "likes"        : v["likes"]["summary"]["total_count"] if "likes" in v.keys() else 0,
                        "comments"     : v["comments"]["summary"]["total_count"] if "comments" in v.keys() else 0,
                        "shares"       : v["shares"]["count"] if "shares" in v.keys() else 0,
                        "message"     : v["message"] if "message" in v.keys() else "",
                        "full_picture" : v["full_picture"],
                        "full_picture_x": sizes[0],
                        "full_picture_y": sizes[1],
                        "date": v["created_time"],
                        "id"           : v["id"]
                        })
                    data[k]["score"] = 0.64*(data[-1]["likes"])/145 +0.52*data[-1]["comments"]/61+0.56*data[-1]["shares"]/20                
    max_score = np.max([x["score"] for x in data[k]])
    for k in range(data):
        data[k]["score"] = data[k]["score"]/max_score        
        
except OAuthError:
    pass        

with open('../data/'+name+'.json', 'w') as outfile:    
  json.dump(data, outfile, indent = 4)

with open('../data/'+name+'_100.json', 'w') as outfile:    
  json.dump(data[1:100], outfile, indent = 4)