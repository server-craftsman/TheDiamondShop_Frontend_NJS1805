import React from "react";
import "./index.scss";
import Footer from "../../components/footer";

function Instruct() {
  return (
    <div>
    <div className="instruct">
      <h1>How to Measure Your Ring Size</h1>
      <p>Follow these steps to accurately determine your ring size at home.</p>

      <section className="step">
        <h2>Step 1: Prepare Your Materials</h2>
        <img src="https://caohungdiamond.com/wp-content/uploads/2022/09/do-size-nhan-bang-giay-va-thuoc.jpg" alt="Materials needed" />
        <p>Gather a strip of paper, a ruler, and a pen.</p>
      </section>

      <section className="step">
        <h2>Step 2: Wrap the Paper Around Your Finger</h2>
        <img src="path_to_image_step_2.jpg" alt="Wrapping paper around finger" />
        <p>Wrap the strip of paper around the base of your finger. Ensure it fits snugly but not too tight.</p>
      </section>

      <section className="step">
        <h2>Step 3: Mark the Paper</h2>
        <img src="path_to_image_step_3.jpg" alt="Marking the paper" />
        <p>Mark the point where the paper overlaps with a pen.</p>
      </section>

      <section className="step">
        <h2>Step 4: Measure the Paper</h2>
        <img src="path_to_image_step_4.jpg" alt="Measuring the paper" />
        <p>Use a ruler to measure the length of the paper from the starting point to the mark. Note the measurement in millimeters.</p>
      </section>

      <section className="step">
        <h2>Step 5: Find Your Size</h2>
        <img src="path_to_image_step_5.jpg" alt="Ring size chart" />
        <p>Use the measurement to find your ring size using a ring size chart.</p>
      </section>
      
    </div>
    <Footer />
    </div>
  );
}

export default Instruct;
