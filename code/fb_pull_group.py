from facepy import GraphAPI
import json
from facepy import utils,OAuthError


access_token = utils.get_application_access_token('508385019364150', '22e4fc5b8e6bd6e086adcb9f3e1730d8')
group_id = "508035479308296" #"SyrianHomeBerlin"


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
                    data.append({
                        "likes"        : v["likes"]["summary"]["total_count"] if "likes" in v.keys() else 0,
                        "comments"     : v["comments"]["summary"]["total_count"] if "comments" in v.keys() else 0,
                        "shares"       : v["shares"]["count"] if "shares" in v.keys() else 0,
                        "message"     : v["message"] if "message" in v.keys() else "",
                        "full_picture" : v["full_picture"],
                        "date": v["created_time"],
                        "id"           : v["id"]
                        })
                    data[-1]["score"] = 0.64*(data[-1]["likes"])/145+0.52*data[-1]["comments"]/61+0.56*data[-1]["shares"]/20
except OAuthError:
    pass        

with open('../data/content.json', 'w') as outfile:    
  json.dump(data, outfile, indent = 4)

with open('../data/content_100.json', 'w') as outfile:    
  json.dump(data[1:100], outfile, indent = 4)