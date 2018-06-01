define({ "api": [
  {
    "type": "get",
    "url": "/vehicles",
    "title": "all vehicles",
    "group": "Vehicles",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "vehicles",
            "description": "<p>Vehicles's list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vehicles._id",
            "description": "<p>Vehicle _id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vehicles.vin",
            "description": "<p>Vehicle vin</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vehicles.regNo",
            "description": "<p>Vehicle regNo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[{\n  \"_id\" : \"5a31919b94112a28acde2a1d\",\n   \"vin\" : \"YS2R4X20005399401\",\n   \"regNo\" : \"ABC123\"\n}]",
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
    "filename": "./api/vehicle.js",
    "groupTitle": "Vehicles",
    "name": "GetVehicles"
  },
  {
    "type": "get",
    "url": "/vehicles/count",
    "title": "count all vehicles",
    "group": "Vehicles",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n5",
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
    "filename": "./api/vehicle.js",
    "groupTitle": "Vehicles",
    "name": "GetVehiclesCount"
  },
  {
    "type": "get",
    "url": "/vehicles/count/connected",
    "title": "count all connected vehicles",
    "group": "Vehicles",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n5",
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
    "filename": "./api/vehicle.js",
    "groupTitle": "Vehicles",
    "name": "GetVehiclesCountConnected"
  },
  {
    "type": "get",
    "url": "/vehicles/count/disconnected",
    "title": "count all disconnected vehicles",
    "group": "Vehicles",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n5",
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
    "filename": "./api/vehicle.js",
    "groupTitle": "Vehicles",
    "name": "GetVehiclesCountDisconnected"
  },
  {
    "type": "get",
    "url": "/vehicles/{id}",
    "title": "get vehicle details by id",
    "group": "Vehicles",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "vehicle",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vehicles._id",
            "description": "<p>Vehicle _id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vehicles.vin",
            "description": "<p>Vehicle vin</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vehicles.regNo",
            "description": "<p>Vehicle regNo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n {\n  \"_id\" : \"5a31919b94112a28acde2a1d\",\n   \"vin\" : \"YS2R4X20005399401\",\n   \"regNo\" : \"ABC123\"\n}",
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
    "filename": "./api/vehicle.js",
    "groupTitle": "Vehicles",
    "name": "GetVehiclesId"
  }
] });
