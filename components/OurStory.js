"use client";

import Image from "next/image";

export default function OurStory() {
  return (

     <div className="our-story">
        <div className="container">
            <div className="row section-row align-items-center">
                <div className="col-lg-6">
                    <div className="section-title">
                        <h3 className="wow fadeInUp">our story</h3>
                        <h2 className="text-anime-style-2" data-cursor="-opaque">Transforming Industries Through <span>Innovation and Precision</span></h2>
                    </div>
                    
                </div>

                <div className="col-lg-6">
                    <div className="our-story-header-img">
                        <figure className="image-anime">
                             <Image
                src="/images/storytopleft.jpg"
                alt="Office"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                unoptimized
              />
                        </figure>

                        <figure className="image-anime">
                            <Image
                src="/images/storytopright.jpg"
                alt="Office 1"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                unoptimized
              />
                        </figure>
                    </div>
                    
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="our-story-img">
                        <figure className="image-anime">
                            <Image
                src="/images/storybottom.jpg"
                alt="Track"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                unoptimized
              />
                        </figure>
                    </div>
                    
                </div>

                <div className="col-lg-6">
                    <div className="our-story-content">
                        <div className="our-story-content-body">
                            <p>Founded in 2013, AHIL has steadily built a reputation for trust, reliability, and customer-centric manufacturing. Under the visionary leadership of Mr. Angad Singh, we have grown into a dynamic organization known for delivering innovative and efficient engineering solutions.</p>
                        <p>With a team of 100+ skilled professionals, we are committed to exceeding customer expectations through technical expertise, quality excellence, and responsive service. Today, AHIL proudly partners with clients — including Indian Railways, Metros, and PSUs — driving transformation through precision and innovation.</p>
                        </div>

                       {/* <div className="our-story-counters">
                            
                            <div className="our-story-counter">
                                <h3><span className="counter">10</span>+</h3>
                                <p>completed project</p>
                            </div>
                            
                            <div className="our-story-counter">
                                <h3><span className="counter">15</span>+</h3>
                                <p>satisfied customer</p>
                            </div>
                            
                            <div className="our-story-counter">
                                <h3><span className="counter">12</span>+</h3>
                                <p>years of mastery</p>
                            </div>
                           
                        
                    </div>*/}
                </div>
            </div>
        </div>
     </div>
     </div>
  );
}
