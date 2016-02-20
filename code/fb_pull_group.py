from facepy import GraphAPI
import json
from facepy import utils

access_token = utils.get_application_access_token('508385019364150', '22e4fc5b8e6bd6e086adcb9f3e1730d8')
group_id = "508035479308296" #"SyrianHomeBerlin"


graph = GraphAPI(access_token)

# https://facepy.readthedocs.org/en/latest/usage/graph-api.html
data = graph.get(group_id + "/feed?fields=id,message,full_picture,likes", page=False, retry=3, limit=100)

with open('../data/content.json', 'w') as outfile:
  json.dump(data, outfile, indent = 4)