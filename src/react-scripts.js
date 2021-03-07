
const buttons= [
  {keyName:"Q",
    url:"https://www.fesliyanstudios.com/play-mp3/6711", 
    class:"drum-pad",drumName:"Hi-Hat-Open1"},
  {keyName:"W",
    url:"https://www.fesliyanstudios.com/play-mp3/6700", 
    class:"drum-pad",drumName:"Hi-Hat-Closed"},
  {keyName:"E",
    url:"https://www.fesliyanstudios.com/play-mp3/6714", 
    class:"drum-pad",drumName:"Hi-Hat-Open2"},
  {keyName:"A",
    url:"https://www.fesliyanstudios.com/play-mp3/6659", 
    class:"drum-pad",drumName:"Bass-Drum-6"},
  {keyName:"S",
    url:"https://www.fesliyanstudios.com/play-mp3/6655", 
    class:"drum-pad",drumName:"Bass-Drum-3"},
  {keyName:"D",
    url:"https://www.fesliyanstudios.com/play-mp3/6780", 
    class:"drum-pad",drumName:"Splash-Cymbal-Short"},
  {keyName:"Z",
    url:"https://www.fesliyanstudios.com/play-mp3/6774", 
    class:"drum-pad",drumName:"Snare-Drum-6"},
  {keyName:"X",
    url:"https://www.fesliyanstudios.com/play-mp3/6768", 
    class:"drum-pad",drumName:"Snare-Drum-3"},
  {keyName:"C",
    url:"https://www.fesliyanstudios.com/play-mp3/6677", 
    class:"drum-pad",drumName:"Drum-Stick"},
]






class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={class:"drum-pad",
                sliderVal:0.3,
              display:""};
     
    this.adjustVolume=this.adjustVolume.bind(this);
    this.setDisplay=this.setDisplay.bind(this);
  }

  
  render () {
      return (<div id="displayPad">
                
                {buttons.map((button,i) => {
                   return (<Drum key={i} id={button.drumName/*button.keyName + "drum"*/} 
                  btn={button.keyName} url={button.url} vol={this.state.sliderVal} show={this.setDisplay}
                  />);
                
                })
                  }    
             
             <div id="display">
               <h3>{this.state.display}</h3>
             </div>
             <VolumeControl val={this.state.sliderVal} change={this.adjustVolume} /></div>);
             
  } 
  

  setDisplay(e){
    
    this.setState({display:e});
    
    setTimeout(() =>{
      this.setState({display:""})}
        , 1000);
    
  }

  adjustVolume(e){
    //console.log(e.target.value)
    this.setState({sliderVal:e.target.value})

  }
  

}





class Drum extends React.Component {
    constructor(props) {
        super(props);
        this.state={class:"drum-pad"};
         
        this.handleKey=this.handleKey.bind(this);
        this.playAudio=this.playAudio.bind(this);
        this.highlight=this.highlight.bind(this);
      }
  
  
    render(){
    return (<div onClick={this.playAudio} className= {this.state.class} id = {this.props.id}>
            <h3>{this.props.btn}</h3>
            <audio id={this.props.btn}
              src={this.props.url} className="clip" />
            
            </div>)
  }
  componentDidMount () {
    document.addEventListener("keydown",this.handleKey);
    
  };
  handleKey (e)  {
    
    if (e.key.toUpperCase() == this.props.btn){ 
      this.playAudio();
    }
  }

  playAudio (e)  {
    console.log(this.props.btn);
    let pressedButton = document.getElementById(this.props.btn);
    this.props.show(this.props.id);
    pressedButton.currentTime = 0;
    pressedButton.volume=this.props.vol;
    pressedButton.play();
    this.highlight(pressedButton);
   
  };
  highlight(){
  
    this.setState({class:"drum-pad-highlight"})

    setTimeout(() =>{

      this.setState({class:"drum-pad"})}
    , 100);
  }
}

class VolumeControl extends React.Component {
  render(){
    return (<div className="volume">
              <input type="range" min="0" max="1" step="0.01" value={this.props.val} onChange={this.props.change} />  
            </div>)
  }
}

ReactDOM.render(<App />,document.getElementById("drum-machine"));

