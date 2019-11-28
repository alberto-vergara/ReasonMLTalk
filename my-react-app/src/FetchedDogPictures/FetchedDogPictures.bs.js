'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Js_mapperRt = require("bs-platform/lib/js/js_mapperRt.js");

var jsMapperConstantArray = /* array */[
  /* tuple */[
    -260726702,
    "visible"
  ],
  /* tuple */[
    19559306,
    "hidden"
  ]
];

function visibilityToJs(param) {
  return Js_mapperRt.binarySearch(2, param, jsMapperConstantArray);
}

function visibilityFromJs(param) {
  return Js_mapperRt.revSearch(2, jsMapperConstantArray, param);
}

function reducer(state, param) {
  if (state >= 19559306) {
    return /* Visible */-260726702;
  } else {
    return /* Hidden */19559306;
  }
}

function FetchedDogPictures(Props) {
  var match = React.useState((function () {
          return /* Loading */0;
        }));
  var setState = match[1];
  var state = match[0];
  var match$1 = React.useReducer(reducer, /* Visible */-260726702);
  var dispatchVisibility = match$1[1];
  React.useEffect((function () {
          if (typeof state === "number" && state === 0) {
            fetch("https://dog.ceo/api/breeds/image/random/3").then((function (response) {
                        return response.json();
                      })).then((function (jsonResponse) {
                      Curry._1(setState, (function (_previousState) {
                              return /* Loaded */[jsonResponse.message];
                            }));
                      return Promise.resolve(/* () */0);
                    })).catch((function (_err) {
                    Curry._1(setState, (function (_previousState) {
                            return /* ErrorFetching */1;
                          }));
                    return Promise.resolve(/* () */0);
                  }));
            return ;
          }
          
        }), /* array */[state]);
  var tmp;
  if (typeof state === "number") {
    tmp = state !== 0 ? "An error occurred!" : "Loading...";
  } else {
    var dogs = state[0];
    tmp = Belt_Array.mapWithIndex(dogs, (function (i, dog) {
            var match = i === (dogs.length - 1 | 0);
            var imageStyle = {
              backgroundImage: "url(" + (String(dog) + ")"),
              backgroundPosition: "center",
              height: "120px",
              marginRight: match ? "0px" : "8px",
              width: "100%",
              backgroundSize: "cover",
              borderRadius: "8px",
              boxShadow: "0px 4px 16px rgb(200, 200, 200)"
            };
            return React.createElement("div", {
                        key: dog,
                        style: imageStyle
                      });
          }));
  }
  return React.createElement("div", undefined, React.createElement("button", {
                  style: {
                    margin: "10px"
                  },
                  onClick: (function (param) {
                      return Curry._1(dispatchVisibility, /* Toggle */0);
                    })
                }, "Toggle show dogs"), React.createElement("button", {
                  style: {
                    margin: "10px"
                  },
                  onClick: (function (param) {
                      return Curry._1(setState, (function (param) {
                                    return /* Loading */0;
                                  }));
                    })
                }, "Fetch more dogs"), React.createElement("div", {
                  style: {
                    display: "flex",
                    height: "120px",
                    visibility: visibilityToJs(match$1[0]),
                    alignItems: "center",
                    justifyContent: "center"
                  }
                }, tmp));
}

var make = FetchedDogPictures;

exports.visibilityToJs = visibilityToJs;
exports.visibilityFromJs = visibilityFromJs;
exports.reducer = reducer;
exports.make = make;
/* react Not a pure module */
