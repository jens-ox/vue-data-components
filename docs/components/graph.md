# Graph

Graph components wrap the components typically found in your everyday graph.

## CartesianGraph

This component is made to make the creation of typical graphs (i.e. graphs on the X-Y plane) easier.

**Type**: Complex

**Children**:

- x axis (component [Axis](TODO)): exposed as `xAxis`
- y axis (component [Axis](TODO)): exposed as `yAxis`
- grid (component [Grid](TODO)): exposed as `grid`

**Props**

| Name   | Type     | Default                                  | Description                                                                                   |
| :----- | :------- | :--------------------------------------- | :-------------------------------------------------------------------------------------------- |
| xScale | Function | _required_                               | x scaling function                                                                            |
| yScale | Function | _required_                               | y scaling function                                                                            |
| width  | Number   | _required_                               | width of the graph                                                                            |
| height | Number   | _required_                               | height of the graph                                                                           |
| margin | Object   | `{ top: 0, left: 0, right: 0, left: 0 }` | Distance between the border of the svg and the graph's contents (= part enclosed by the axes) |

**Example**: see e.g. the [BarChart examples](TODO).
