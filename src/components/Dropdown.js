// import React from 'react';
// import { Button, FormControl, Grid, Row, Col, Image, DropdownButton, MenuItem, Carousel } from 'react-bootstrap';


//  class Dropdown extends React.Component{

//      constructor(props) {
//          super(props)

//          this.grid = this.grid.bind(this);
 
//          this.state = {
//              user: "",
//              photos: [],
//              photoSet: new Set(),
//              error: null,
//              nsfw: false,
//              onlyNsfw: false,
//              num: 6,
//              dropDownTitle: "Medium"
//          }
//      }

//      grid(title, num) {
//          this.setState({
//              dropDownTitle: title,
//              num: num
//          })
//      }

//     render(){
//         return(
//         <DropdownButton
//             className="dropdown"
//             title={this.state.dropDownTitle}
//             id="dropdown-size-medium">
//             <MenuItem eventKey="1" onSelect={() => this.grid("Large", 12)}>Large</MenuItem>
//             <MenuItem eventKey="2" onSelect={() => this.grid("Medium", 6)}>Medium</MenuItem>
//             <MenuItem eventKey="3" onSelect={() => this.grid("Small", 3)}>Small</MenuItem>
//             <MenuItem eventKey="4" onSelect={() => this.grid("Tiny", 1)}>Tiny</MenuItem>
//         </DropdownButton>
//         )
//     }
// }

// export default Dropdown;
