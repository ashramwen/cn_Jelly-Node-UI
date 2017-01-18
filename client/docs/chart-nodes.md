## single line chart
```json
[{
  "id": 1,
  "type": "Filter",
  "must": [{
    "field": "date",
    "expression": "gte",
    "valueHolder": "@startAt"
  }, {
    "field": "date",
    "expression": "lte",
    "valueHolder": "@endAt"
  }],
  "mustNot": [],
  "accepts": []
}, {
  "id": 2,
  "type": "LineChart",
  "name": "simple line chart",
  "analysisTarget": "0195ea",
  "xAxisDisplayName": "Time",
  "yAxisDisplayName": ["Density", "Lum"],
  "accepts": [1]
}, {
  "id": 3,
  "type": "Metric",
  "aggregationMethod": "avg",
  "field": "temperature",
  "accepts": [2]
}, {
  "id": 4,
  "type": "Bucket",
  "aggregationMethod": "dateHistorgram",
  "field": "date",
  "interval": 1,
  "unit": "hour",
  "accepts": [2]
}]
```

## pie chart
```json
[{
  "id": 1,
  "type": "PieChart",
  "name": "simple pie chart",
  "analysisTarget": "0195ea"
}, {
  "id": 2,
  "type": "Metric",
  "aggregationMethod": "count",
  "field": "occurrence",
  "accepts": [1]
}, {
  "id": 3,
  "type": "Bucket",
  "aggregationMethod": "terms",
  "field": "buildingNumber",
  "accepts": [1]
}, {
  "id": 4,
  "type": "Bucket",
  "aggregationMethod": "terms",
  "field": "floorNumber",
  "accepts": [3]
}]
```

## line chart with two metrics
```json
[{
  "id": 1,
  "type": "LineChart",
  "name": "multi line chart",
  "analysisTarget": "0195ea",
  "yAxisDisplayName": ["Density", "Lum"]
}, {
  "id": 2,
  "type": "Metric",
  "aggregationMethod": "avg",
  "yAxisGroupID": "Density"
}, {
  "id": 3,
  "type": "Metric",
  "aggregationMethod": "avg",
  "field": "brightness",
  "yAxisGroupID": "Lum"
}, {
  "id": 4,
  "type": "Bucket",
  "aggregationMethod": "dateHistorgram",
  "field": "date",
  "interval": 1,
  "unit": "minute"
}]
```

## line chart with two bucket aggregation
```json
[{
  "id": 1,
  "type": "LineChart",
  "analysisTarget": "0195ea",
  "xAxisDisplayName": "Time",
  "yAxisDisplayName": ["Density", "Lum"]
}, {
  "id": 2,
  "type": "Metric",
  "aggregation": "avg",
  "field": "temperature",
  "accepts": [1]
}, {
  "id": 3,
  "type": "Bucket",
  "aggregation": "dateHistorgram",
  "interval": 1,
  "unit": "minute",
  "accepts": [1]
}, {
  "id": 4,
  "type": "Bucket",
  "aggregation": "Terms",
  "field": "Location",
  "accepts": [3]
}]
```

## Scatter Chart
```json
[{
  "id": 1,
  "type": "ScatterChart",
  "name": "simple bubble chart",
  "analysisTarget": "e41edasd",
  "xAxisDisplayName": "Time",
  "yAxisDisplayName": ["KG"],
  "accepts":[]
}, {
  "id": 2,
  "type": "Metric",
  "aggregationMethod": "avg",
  "field": "weight",
  "accepts": [1]
}, {
  "id": 3,
  "type": "Bucket",
  "aggregation": "Histogram",
  "field": "heartWeight",
  "interval": 10,
  "accepts": [1]
}, {
  "id": 4,
  "type": "Bucket",
  "aggregation": "Terms",
  "field": "sex",
  "accepts": [3]
}]
```

## Bubble chart
```json
[{
  "id": 1,
  "type": "BubbleChart",
  "name": "somple bubble chart",
  "analysisTarget": "12fasfas",
  "xAxisDisplayName": "Time",
  "yAxisDisplayName": ["KG"],
  "color": {
    "field": "sex",
    "aggregation": "terms"
  },
  "size": {
    "aggregation": "avg",
    "field": "bodyLength"
  },
  "accepts": []
}, {
  "id": 2,
  "type": "Metric",
  "aggregation": "avg",
  "field": "weight",
  "accepts": [1]
}, {
  "id": 3,
  "type": "Bucket",
  "aggregation": "Histogram",
  "field": "heartWeight",
  "accepts": [1]
}]
```

## Bar chart
```json
[{
  "id": 1,
  "type": "LineChart",
  "analysisTarget": "fasefa",
  "xAxisDisplayName": "Time",
  "yAxisDisplayName": ["Density"],
  "accepts": []
}, {
  "id": 2,
  "type": "BarChart",
  "analysisTarget": "fasefa",
  "xAxisDisplayName": "time",
  "yAxisDisplayName": ["Density"],
  "accepts": [1]
}, {
  "id": 3,
  "type": "Meric",
  "aggregation": "avg",
  "field": "CO2",
  "accepts": [1]
}, {
  "id": 4,
  "type": "Bucket",
  "aggregation": "dateHistorgram",
  "field": "date",
  "interval": 1,
  "unit": "minute",
  "accepts": [1, 2]
}, {
  "id": 5,
  "type": "Metric",
  "aggregationMethod": "avg",
  "field": "CO2",
  "accepts": [2]
}, {
  "id": 7,
  "type": "DrillDown",
  "accepts": [2]
}, {
  "id": 8,
  "type": "Extend",
  "accepts":[2]
}, {
  "id": 9,
  "type": "SubChart",
  "accepts": [7],
  "chartType": "BarChart",
  "xAxisDisplayName": "Time"
}, {
  "id": 10,
  "type": "Bucket",
  "aggregation": "Histogram",
  "field": "buildingNumber",
  "accepts": [8]
}, {
  "id": 11,
  "type": "Bucket",
  "aggregation": "terms",
  "field": "buildingNumber",
  "accepts": [9]
}, {
  "id": 12,
  "type": "DrillDown",
  "accepts": [9]
}, {
  "id": 13,
  "type": "SubChart",
  "name": "Simple Line Chart",
  "chartType": "bar",
  "xAxisDisplayName": "Time",
  "accepts": [12]
}, {
  "id": 14,
  "type": "Bucket",
  "aggregation": "Terms",
  "field": "buildingNumber"
}]
```