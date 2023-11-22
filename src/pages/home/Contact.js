import React, { useContext, useEffect } from 'react'

import { LayoutContext } from '../../context/layout.context'
import {PngIcons} from '../../icons'

export default function Contact() {

    const layout = useContext(LayoutContext)

    useEffect(()=>{
      
      layout.setLayout({
        showNav : true,
        showFooter: true,

      })
  
    },[])

  return (
        <div id="Contact">
            <section id="page-header" className="about-header">
                <h2>#let's_talk</h2>
                <p>LEAVE A MESSAGE, We love to hear from you!</p>
            </section>
            <section id="contact-details" className="section-p1">
                <div className="details">
                <span>GET IN TOUCH</span>
                <h2>Visit one of our agency locations or contact us today</h2>
                <h3>Head Office</h3>
                <div>
                    <li>
                    <i className="fal fa-map" />
                    <p>56 Glassford Street Glasgow G1 1UL New York</p>
                    </li>
                    <li>
                    <i className="far fa-envelope" />
                    <p>contact@example.com </p>
                    </li>
                    <li>
                    <i className="fas fa-phone-alt" />
                    <p>contact@example.com </p>
                    </li>
                    <li>
                    <i className="far fa-clock" />
                    <p>Monday to Saturday: 9.00am to 16.pm </p>
                    </li>
                </div>
                </div>
                <div className="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.8088025254456!2d-1.256555484681452!3d51.754819700404106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876c6a9ef8c485b%3A0xd2ff1883a001afed!2sUniversity%20of%20Oxford!5e0!3m2!1sen!2sbd!4v1637232208485!5m2!1sen!2sbd" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" />
                </div>
            </section>
            <section id="form-details">
                <form action>
                <span>LEAVE A MESSAGE</span>
                <h2>We love to hear from you </h2>
                <input type="text" name id placeholder="Your Name" />
                <input type="text" name id placeholder="E-mail" />
                <input type="text" name id placeholder="Subject" />
                <textarea name id cols={30} rows={10} placeholder="Your Message" defaultValue={""} />
                <button className="normal">Submit</button>
                </form>
                <div className="people">
                <div>
                    <img src="img/people/1.png" alt />
                    <p><span>John Doe </span> Senior Marketing Manager <br /> Phone: + 000 123 000 77 88 <br /> Email: contact@example.com</p>
                </div>
                <div>
                    <img src="img/people/2.png" alt />
                    <p><span>William Smith</span> Senior Marketing Manager <br /> Phone: + 000 123 000 77 88 <br /> Email: contact@example.com</p>
                </div>
                <div>
                    <img src="img/people/3.png" alt />
                    <p><span>Emma Stone</span> Senior Marketing Manager <br /> Phone: + 000 123 000 77 88 <br /> Email: contact@example.com</p>
                </div>
                </div>
            </section>
    </div>
  )
}
