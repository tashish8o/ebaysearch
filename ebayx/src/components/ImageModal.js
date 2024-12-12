import React from 'react';
import { Modal, Carousel,Button } from 'react-bootstrap';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './modal.css';


/*
"create a Bootstrap Image Modal with an array of images that I have and display it when I click on a text" prompt (1 line). ChatGPT, 17 Oct. version, OpenAI, 20 Oct. 2023, chat.openai.com/chat.
*/  

const ImageModal = ({ show, handleClose, images }) => {


    const customIconStyle = {
        background: '#000', // Dark background color
        color: '#fff', // Icon color
        fontSize: '40px', // Icon size
        cursor: 'pointer',
        fontWeight: 'bold'
      };    


  return (
    <div>
    <Modal show={show} onHide={handleClose} >
      <Modal.Header closeButton>
        <Modal.Title><h6>Product Images</h6></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel
          nextIcon={<KeyboardArrowRightIcon style={customIconStyle} />}
          prevIcon={<KeyboardArrowLeftIcon style={customIconStyle} />}  
          interval={null}  
        >
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <div style={{textAlign:"center",height:"450px"}}> 
                <img src={image} alt={`Image ${index + 1}`} style={{ border: "10px solid black", width: "100%", height: "100%" }} />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
    </Modal>
    </div>
  );
};

export default ImageModal;

