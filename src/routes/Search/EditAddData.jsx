import React  from "react";
import { SalesReps } from "./SalesReps";
import { v4 as uuidv4 } from 'uuid';


 class EditAddData extends React.Component{
  constructor(props) {
    super(props)
    const {id, name, trading} = props.location.state.user;
    this.state = {
      id: id,
      name: name,
      trading: trading,
    };
  }


  //using states in class components
    // state = {
    //   id: uuidv4(),
    //   name: "",
    //   trading: "",
    //   volumes: null,
    //   revenue: null,
    //   show: false
    // };
  
    onShowClick = () => {
      this.setState(prevState => ({show: !prevState.show}));
      
    }
  

    update = (e) => {
      e.preventDefault();//stops refresh
      if(this.state.name === "" || this.state.trading === "" ){
        alert("Please Enter Data");
        return
      }

      else {
        this.onShowClick();
      }
      console.log("Data entered:", this.state);

      // this.props.addDataHandler({ ...this.state})
      this.props.updateDataHandler(this.state)    
      // this.setState({ name: "", trading: "" });
      // this.props.history.push("/");
    }

  render() {
    return (
      <>
          <div> <span className="add-data-heading"><h3>Add Data</h3></span></div>
          <hr />
         <div className="input-data">
        <form onSubmit={this.update}>
          <div className="myInput">
           <label>Name:</label>
            <input 
              type="text" 
              value={this.state.name}
              placeholder="enter name" 
              onChange={ (e) => this.setState({name: e.target.value})} /> 
          </div>
          <div className="myInput">
           <label>Sale:</label>
            <input className="sale-input"
              type="text" 
              value={this.state.trading}
              placeholder="enter data" 
              onChange={ (e) => this.setState({trading: e.target.value})}/> 
          </div>
          <button className="add-data-btn" type="submit" >Update</button>
               <div> 
                {this.state.show && <SalesReps 
                  key={this.id}
                  users={[this.state]}
                  removeDataHandler={this.props.removeDataHandler}
                  addDataHandler={this.props.addDataHandler}
                  updateDataHandler={this.props.updateDataHandler}
                  />  }
                 
              </div> 
        </form>
      </div>
      
      </>
      
    );
    
  }
  
}

export default EditAddData;