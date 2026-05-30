import React from 'react'

export default function GoogleMaps() {
  return (
    <div className="google-map section">
      <div className="container">
        <div className="section-title text-center mb-5 mt-4">
          <h2>Our Locations</h2>
          <p>Visit us at any of our offices across the country.</p>
        </div>
        <div className="row g-4">
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-3 text-center">Corporate Office</h5>
            <div className="google-map-iframe">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.884523321583!2d77.17572847585258!3d28.64433557565814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03c1ac2a06ed%3A0x9fd61c4eea0cef69!2sAND%20Hitech%20Industries%20Limited.%20(Corporate%20Office)!5e0!3m2!1sen!2sin!4v1717056000000!5m2!1sen!2sin" 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-3 text-center">Manufacturing Plant (Unit-1)</h5>
            <div className="google-map-iframe">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14033.641263915197!2d77.565772!3d28.437045!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cbf0c1568576d%3A0xb72dcf64114b3f39!2sAND%20HITECH%20INDUSTRIES%20LTD.%20(UNIT-2)!5e0!3m2!1sen!2sin!4v1760082843630!5m2!1sen!2sin"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-3 text-center">Manufacturing Plant (Unit-2)</h5>
            <div className="google-map-iframe">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d877.1034046751665!2d77.5685434!3d28.4369454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cbf007bb28929%3A0x5a94ea0bef6aceef!2sSPHERE%20THERMAL%20SYSTEM%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1760082902805!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-3 text-center">Manufacturing Plant (Unit-3)</h5>
            <div className="google-map-iframe">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14033.641263915197!2d77.565772!3d28.437045!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cbf0c1568576d%3A0xb72dcf64114b3f39!2sAND%20HITECH%20INDUSTRIES%20LTD.%20(UNIT-2)!5e0!3m2!1sen!2sin!4v1760082967590!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
