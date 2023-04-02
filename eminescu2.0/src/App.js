import './App.css';
import React, {useState} from 'react';
import nothing from './img/Untitled.png';
import emi from './img/Eminescu.jpg'
import bubbles from './img/bubble.png';
import black from './img/black.png';


function App() {
  const [inputPrompt, setInputPrompt] = useState('');
  const [poemGenerate, setPoemGenerate] = useState('');
  const [imageGenerator, setImageGenerator] = useState('');

  if (imageGenerator == '') {
    setImageGenerator(nothing);
  }

  const handleSubmit = async (e) => {
    if (inputPrompt == '') inputPrompt = "itec";
    e.preventDefault();
    fetch('http://localhost:1616/poemGenerator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        promptFromUser: inputPrompt,
      }),
    })
    .then((dataFromAI) => dataFromAI.json())
    .then((data) => setPoemGenerate(data.poemFromAI));

    fetch('http://localhost:1616/imageGenerator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        promptFromUser: inputPrompt,
      }),
    })
    .then((dataFromAI) => dataFromAI.json())
    .then((data) => setImageGenerator(data.imageFromAI));
  };

    return (
      <div className="App">
        <div className="main">
          <div className="textgen">
            <pre> {poemGenerate} </pre>
            <img className='img_gen' src={imageGenerator} alt="img generate" />
          </div> 
          <div className='emiandhesmind'>
            <h1> Eminescu 2.0 </h1>
            <img src={emi} className="emi"></img>
            <textarea placeholder="Ex: cars" className="prompt" id="message" onChange={(e) => setInputPrompt(e.target.value)} />
            <p onClick= {handleSubmit} className="btn" type="submit" value="Submit"> Generate </p>
          </div>
        </div>
      </div>
    );
}

export default App;

