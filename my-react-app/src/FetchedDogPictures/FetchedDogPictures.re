[@bs.val] external fetch: string => Js.Promise.t('a) = "fetch";

[@bs.deriving jsConverter]
type visibility = [
  | [@bs.as "visible"]`Visible
  | [@bs.as "hidden"] `Hidden
];

type action = Toggle

let reducer = (state, _) => {
  switch state {
  | `Visible => `Hidden
  | `Hidden => `Visible
  };
};

type state =
  | Loading
  | ErrorFetching
  | Loaded(array(string));

[@react.component]
let make = () => {
  let (state, setState) = React.useState(() => Loading);
  let (visibilityState, dispatchVisibility) = React.useReducer(reducer, `Visible);

  // Notice that instead of `useEffect`, we have `useEffect0`. See
  // reasonml.github.io/reason-react/docs/en/components#hooks for more info
  React.useEffect1(() => {
    switch state {
    | Loading => Js.Promise.(
        fetch("https://dog.ceo/api/breeds/image/random/3")
        |> then_(response => response##json())
        |> then_(jsonResponse => {
            setState(_previousState => Loaded(jsonResponse##message));
            Js.Promise.resolve();
          })
        |> catch(_err => {
            setState(_previousState => ErrorFetching);
            Js.Promise.resolve();
          })
        |> ignore
      );
      None
    | ErrorFetching => None
    | Loaded(_) => None
    }
  }, [| state |]);
  
  <div>
    <button style={ReactDOMRe.Style.make(~margin="10px", ())}
     onClick={_ => dispatchVisibility(Toggle)}
    > 
    { React.string("Toggle show dogs") }  
    </button>
    <button style={ReactDOMRe.Style.make(~margin="10px", ())}
     onClick={_ => setState(_ => Loading  ) }
    > 
    { React.string("Fetch more dogs") }  
    </button>
    <div
      style={ReactDOMRe.Style.make(
        ~height="120px",
        ~display="flex",
        ~alignItems="center",
        ~justifyContent="center",
        ~visibility=visibilityToJs(visibilityState),
        (),
      )}>
      {switch (state) {
      | ErrorFetching => React.string("An error occurred!")
      | Loading => React.string("Loading...")
      | Loaded(dogs) =>
        dogs
        ->Belt.Array.mapWithIndex((i, dog) => {
            let imageStyle =
              ReactDOMRe.Style.make(
                ~height="120px",
                ~width="100%",
                ~marginRight=i === Js.Array.length(dogs) - 1 ? "0px" : "8px",
                ~borderRadius="8px",
                ~boxShadow="0px 4px 16px rgb(200, 200, 200)",
                ~backgroundSize="cover",
                ~backgroundImage={j|url($dog)|j},
                ~backgroundPosition="center",
                (),
              );
            <div key=dog style=imageStyle />;
          })
        ->React.array
      }}
    </div>
  </div>
};
