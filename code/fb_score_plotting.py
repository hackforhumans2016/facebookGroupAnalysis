# -*- coding: utf-8 -*-
"""
Created on Sat Feb 20 15:01:52 2016

@author: behinger
"""

import matplotlib.pyplot as plt
import seaborn as sns
import json
import pandas as pd


df = pd.read_json( open('../data/content.json', 'r'))


sns.pairplot(df)