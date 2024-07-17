import React from "react";
import "./index.scss";
import Footer from "../../components/footer";
import ReactPlayer from "react-player";

function Instruct() {
  return (
    <div className="body">
    <div className="instruct">
      <h1>How to Measure Your Ring Size</h1>
      <br />
      <div className='video-wrapper'>
          <ReactPlayer
            className="video"
            url='https://www.youtube.com/watch?v=LfdPTxCo6_A'
            playing
            controls
          />
        </div>
        <br />
      <p>Follow these steps to accurately determine your ring size at home.</p>
      <br />

      <section className="step">
        <h2>Prepare Your Materials</h2>
        <img src="https://i0.wp.com/www.jewellerystore.pk/wp-content/uploads/2018/10/Find-Your-Ring-Size-Step-1.jpg?w=728&ssl=1" alt="Materials needed" />
        <p>Gather a strip of paper, a ruler, and a pen.</p>
      </section>

      <section className="step">
        <h2>Wrap the Paper Around Your Finger</h2>
        <img src="https://www.jewellerystore.pk/wp-content/uploads/2018/10/Find-Your-Ring-Size-Step-2.jpg" alt="Wrapping paper around finger" />
        <p>Wrap the strip of paper around the base of your finger. Ensure it fits snugly but not too tight.</p>
      </section>

      <section className="step">
        <h2>Mark the Paper</h2>
        <img src="https://www.wikihow.com/images/thumb/c/ce/Size-Rings-Step-7-Version-3.jpg/v4-460px-Size-Rings-Step-7-Version-3.jpg.webp" alt="Marking the paper" />
        <p>Mark the point where the paper overlaps with a pen.</p>
      </section>

      <section className="step">
        <h2>Measure the Paper</h2>
        <img src="https://www.wikihow.com/images/thumb/3/31/Size-Rings-Step-8.jpg/v4-460px-Size-Rings-Step-8.jpg.webp" alt="Measuring the paper" />
        <p>Use a ruler to measure the length of the paper from the starting point to the mark..</p>
        <p style={{fontStyle: "italic", color: "red", fontWeight: "bold"}}>Note the measurement in millimeters.</p>
      </section>

      <section className="step">
        <h2>Find Your Size</h2>
        <img src="https://i0.wp.com/www.jewellerystore.pk/wp-content/uploads/2018/10/Find-Your-Ring-Size-Method-3.jpg?w=795&ssl=1" alt="Ring size chart" />
        <p>Use the measurement to find your ring size using a ring size chart.</p>
      </section>
      
    </div>
    <Footer />
    </div>
  );
}

export default Instruct;
