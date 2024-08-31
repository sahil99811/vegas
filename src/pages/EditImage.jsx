import * as fabric from 'fabric';
import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

export default function EditImage() {
  const location = useLocation();
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [textValue, setTextValue] = useState('');
  const [textColor, setTextColor] = useState('#000000');

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      preserveObjectStacking: true,
    });
    setCanvas(newCanvas);
    setImageUrl(location.state.url);

    return () => {
      newCanvas.dispose();
    };
  }, [location.state.url]);

  useEffect(() => {
    if (canvas && imageUrl) {
      const imageElement = document.createElement('img');
      imageElement.crossOrigin = 'Anonymous'; 
      imageElement.src = imageUrl; 
      imageElement.style.width = '400px';
      imageElement.style.height = '400px';
  
      imageElement.onload = function() {
        const image = new fabric.Image(imageElement);
        image.set({
          left: canvas.width / 2 - image.width / 2,
          top: canvas.height / 2 - image.height / 2,
        });
        canvas.add(image);
        canvas.centerObject(image);
        canvas.setActiveObject(image);
      };
    }
  }, [canvas, imageUrl]);

  const addText = () => {
    const textbox = new fabric.Textbox(textValue || 'Edit me', {
      left: 100,
      top: 100,
      fontSize: 40,
      fontWeight: 500,
      zIndex: 100,
      fill: textColor,
      editable: true,
    });
    canvas.add(textbox);
    textbox.bringToFront(); 
    canvas.setActiveObject(textbox);
  };

  const addShape = (shape) => {
    let shapeObj;
    switch(shape) {
      case 'circle':
        shapeObj = new fabric.Circle({
          left: 150,
          top: 150,
          radius: 50,
          fill: 'rgba(255,0,0,0.5)',
        });
        break;
      case 'rectangle':
        shapeObj = new fabric.Rect({
          left: 150,
          top: 150,
          width: 100,
          height: 100,
          fill: 'rgba(0,255,0,0.5)',
        });
        break;
      case 'triangle':
        shapeObj = new fabric.Triangle({
          left: 150,
          top: 150,
          width: 100,
          height: 100,
          fill: 'rgba(0,0,255,0.5)',
        });
        break;
      case 'polygon':
        shapeObj = new fabric.Polygon([
          { x: 200, y: 0 },
          { x: 250, y: 50 },
          { x: 200, y: 100 },
          { x: 150, y: 50 }
        ], {
          left: 150,
          top: 150,
          fill: 'rgba(255,255,0,0.5)',
        });
        break;
      default:
        break;
    }
    canvas.add(shapeObj);
    shapeObj.sendToBack();
    canvas.setActiveObject(shapeObj);
  };

  const handleDownload = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1.0,
      });
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'edited-image.png';
      link.click();
    }
  };

  const handleTextColorChange = (e) => {
    const color = e.target.value;
    setTextColor(color);
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
      activeObject.set({ fill: color });
      canvas.renderAll();
    }
  };

  return (
    <div className="flex gap-4 h-[100%] w-[100%]">
      <section className="p-4 w-[60%] h-[100%]">
        <canvas ref={canvasRef} width="500px" height="500px" className="border border-dotted border-white"></canvas>
      </section>
      <section className="p-4 flex flex-col w-[40%]">
        <div className="mb-4 flex gap-4">
          <input 
            type='text' 
            placeholder='Enter a text...' 
            value={textValue} 
            onChange={(e) => setTextValue(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button 
            onClick={addText} 
            className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
          >
            Add Text
          </button>
        </div>
        <div className="mb-4 flex flex-col items-center">
          <button 
            onClick={() => addShape('circle')} 
            className="w-[70%] h-16 bg-red-500 text-white p-2 mb-2 rounded"
          >
            Add Circle
          </button>
          <button 
            onClick={() => addShape('rectangle')} 
            className="w-[70%] h-16 bg-green-500 text-white p-2 mb-2 rounded text-lg"
          >
            Add Rectangle
          </button>
          <button 
            onClick={() => addShape('triangle')} 
            className="w-[70%] h-16 bg-blue-500 text-white p-2 mb-2 rounded text-lg"
          >
            Add Triangle
          </button>
          <button 
            onClick={() => addShape('polygon')} 
            className="w-[70%] h-16 bg-yellow-500 text-white p-2 rounded text-lg" 
          >
            Add Polygon
          </button>
        </div>
        <div className="mb-4 flex flex-col items-center w-[70%] mx-auto">
          <label className="block text-sm font-medium mb-1">Text Color</label>
          <input 
            type="color" 
            value={textColor} 
            onChange={handleTextColorChange} 
            className="w-full p-2 h-10 border border-gray-300 rounded cursor-pointer"
          />
        </div>
        <button 
          onClick={handleDownload} 
          className="w-[70%] h-16 bg-purple-500 text-white p-2 rounded items-center mx-auto text-lg"
        >
          Download
        </button>
      </section>
    </div>
  );
}
