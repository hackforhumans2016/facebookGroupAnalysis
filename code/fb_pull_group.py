from facepy import GraphAPI
import json
from facepy import utils
from collections import defaultdict
access_token = utils.get_application_access_token('508385019364150', '22e4fc5b8e6bd6e086adcb9f3e1730d8')
group_id = "508035479308296" #"SyrianHomeBerlin"


graph = GraphAPI(access_token)

# https://facepy.readthedocs.org/en/latest/usage/graph-api.html
data_raw = graph.get(group_id + "/feed?fields=id,message,full_picture,shares,likes.limit(0).summary(true),comments.limit(0).summary(true)", 
                     page=False, retry=3, limit=1500)



data = []
for k,v in enumerate(data_raw["data"]):
    if "full_picture" in v.keys():
        data.append({
            "likes"        : v["likes"]["summary"]["total_count"] if "likes" in v.keys() else 0,
            "comments"     : v["comments"]["summary"]["total_count"] if "comments" in v.keys() else 0,
            "shares"       : v["shares"]["count"] if "shares" in v.keys() else 0,
            "message"     : v["message"] if "message" in v.keys() else "",
            "full_picture" : v["full_picture"],
            "id"           : v["id"]
            })
        data[-1]["score"] = data[-1]["likes"]+data[-1]["likes"]
    

with open('../data/content.json', 'w') as outfile:
  json.dump(data, outfile, indent = 4)