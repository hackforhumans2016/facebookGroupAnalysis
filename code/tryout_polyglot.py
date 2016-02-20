# -*- coding: utf-8 -*-
"""
Created on Sat Feb 20 20:35:42 2016

@author: behinger
"""
import numpy as np
from polyglot.text import Text,Word
a = Text("beautiful text")
a.words[0].morphemes()


def wiki_naive_translator(word):
    import requests
    x = requests.request("GET",
                         "https://ar.wikipedia.org/w/api.php?action=query&format=json&prop=langlinks&titles="+word+"&llprop=url&lllang=en")
    try:
        translation = list(list(x.json()["query"]["pages"].values())[0]["langlinks"][0].values())[1]
    except:
        translation = ""
    return(translation)

translateAll = []
for key,text in enumerate(df.message[801:1300]):
    try:
        entities = Text(text).entities
        
        translate = [wiki_naive_translator(" ".join(ent)) for ent in entities]
        translateAll.append(translate)
    except (ZeroDivisionError,ValueError):
        translateAll.append("")
        
        
df.loc[1:10].translate = translateAll