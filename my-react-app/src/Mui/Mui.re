module Paper = {
  [@react.component] [@bs.module "@material-ui/core/Paper"]
  external make: 
  (~children: React.element, 
   ~className: string=?, 
   ~square: bool=?, 
   ~elevation: int=?) => React.element = "default";
};