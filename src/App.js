import React, { Component } from 'react';
import './App.css';


class  Lap extends Component
{
  state={
    maxlength:-1,
  }
  componentDidMount() {
    
    this.scrollToBottom();
  }

  componentDidUpdate() {
    if(this.props.laps.length===0 && (this.state.maxlength>0)){
      this.setState({maxlength:this.props.laps.length});
    }
    this.scrollToBottom();
  }

  scrollToBottom() {
    
    if(this.lastlap)
    {
      if(this.props.laps.length>this.state.maxlength)
      {
      this.lastlap.scrollIntoView();
      this.setState({maxlength:this.props.laps.length})
      }
      
    }
    
  }
  
  render(){
  if(this.props.laps.length){
  return (
    <div className="stopwatch__lapgroup">
      <div className="stopwatch__lapsheading">Laps:</div>
    <ol className="stopwatch__laps">
     {
       this.props.laps.map((x,i)=>{
         if(this.props.laps.length-1 ===i){ return <li key={i} ref={lastlap => { this.lastlap = lastlap; }} className="stopwatch__lap"> {x}</li> }
        return <li key={i} className="stopwatch__lap"> {x}</li>
     })}
    </ol>
    </div>
    
  );
}
else {
  return "";
}
}

}

class Stopwatch extends Component
{

  state={
    h:0,
    m:0,
    s:0,
    cs:0, // 10ms
    running:false,
    laps:[]
  };
  
tick=() => {
  if(this.state.running){
    if(this.state.cs<99)
    {
      this.setState({cs:this.state.cs+1})
    }
    else{
      this.setState({cs:0})
    if(this.state.s<59)
    {
      this.setState({s:this.state.s+1})
    }
    else{
      this.setState({s:0})
        if(this.state.m<59)
        { 
        this.setState({m:this.state.m+1})
        }
        else{
          this.setState({m:0,h:this.state.h+1})
        }
    }
  }
}
}

doubledigits = (n)=>{ return n<10? "0"+n : n }

componentDidMount() {
  setInterval(this.tick,10); 
}

Toggle = () => { this.setState({running:!this.state.running})}
Reset = () => { this.setState({s:0,m:0,h:0,cs:0,running:false,laps:[]})}
Lap = () => { 
  if ((this.state.h + this.state.m + this.state.s + this.state.cs) > 0 )
  {
    //${this.doubledigits(this.state.h)}:
    this.state.laps.push( `${this.doubledigits(this.state.m)}:${this.doubledigits(this.state.s)}.${this.doubledigits(this.state.cs)}` );
    this.setState({s:0,m:0,h:0,running:true})
  }
}
render() {
  //{this.doubledigits(this.state.h)}:
      
  return (
  <div className={"stopwatch"}>
    <div className={"stopwatch__time"}>
      {this.doubledigits(this.state.m)}:
      {this.doubledigits(this.state.s)}.
      {this.doubledigits(this.state.cs)}
    </div>
    <button className="stopwatch__button" onClick={this.Toggle}>{this.state.running? "Stop":"Start"}</button>
    <button className="stopwatch__button" onClick={this.state.running? this.Lap:this.Reset}>{this.state.running? "Lap":"Reset"}</button>
    <Lap laps={this.state.laps}></Lap>
  </div>
  );  
  }
}

class App extends Component {
 
  render() {
    return (
      <div>
        <div className="banner">Stopwatch</div>
        <Stopwatch  {...this.state}></Stopwatch>
      </div>
    );
  }
}

export default App;
