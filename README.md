# facebookGroupAnalysis

## Main visualization:
The viz-visualization shows the facebook-pictures scaled by popularity (a mix between nComments, nLikes and nShares). This allows for exploration of the discussions of refugees even without understanding of the arabic language.
Code is available to do this online, so to display the live feed.

Demo: http://www.benediktehinger.de/hackforhumans
## JSON format for visualisation
The python scripts output a simplified JSON version of the facebook api JSON.
The format is as follows
```
[{
  id: 1,
  score: 50,
  likes: 102,
  comments: 13,
  shares: 13,
  message: ''
  full_picture: 'https://...'
  full_picutre_x: 500
  full_picutre_y: 700
},
{
  id: 2,
  ...
}]
```

## Data Visualization
We had a rough look at the correlations between likes/comments/shares (very high) and ran a PCA to see how a popularity score can be calculated. In the end, likes are weighted slightly higher (0.65 to 0.5) to comments and shares.

## Bugs/Missing features:
It seems that the date-field of FB is somehow wrong, or at least unsorted - this needs further verification
Live-Update is not finished (but code exists)
Build script does not work correctly (data & scripts are not copied to 'dist')
