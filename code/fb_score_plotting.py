# -*- coding: utf-8 -*-
"""
Created on Sat Feb 20 15:01:52 2016

@author: behinger
"""

import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.decomposition import PCA
import pandas as pd
import datetime
import scipy


df = pd.read_json( open('../data/content.json', 'r'))


sns.pairplot(df)

pca = PCA()
zscored = scipy.stats.mstats.zscore(df.loc[:,["comments","likes","shares"]])
pca.fit(zscored)
pca.components_