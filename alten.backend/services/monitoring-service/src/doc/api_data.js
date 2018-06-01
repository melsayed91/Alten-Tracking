define({ "api": [
  {
    "type": "get",
    "url": "/monitor/status",
    "title": "get all vehicles status",
    "group": "Monitor",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "signals",
            "description": "<p>Signals's list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "signals._id",
            "description": "<p>Signal _id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "signals.vehicleId",
            "description": "<p>Signal vehicleId</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "signals.driverId",
            "description": "<p>Signal driverId</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "signals.status",
            "description": "<p>Signal status</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "signals.timestamp",
            "description": "<p>Signal timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[{\n  \"_id\" : \"5a35bca4fb0703cea434949b\",\n   \"vehicleId\" : \"5a31919b94112a28acde2a1d\",\n   \"driverId\" : \"5a31925294112a28acde2a24\",\n   \"status\" : 1,\n   \"timestamp\" : \"2017-12-19T20:29:00.516+0000\"\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api/monitoring.js",
    "groupTitle": "Monitor",
    "name": "GetMonitorStatus"
  }
] });
