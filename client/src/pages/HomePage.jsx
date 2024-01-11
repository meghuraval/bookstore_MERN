// eslint-disable-next-line no-unused-vars
import React from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/SignUp");
  };

  return (
    <div>
      <div className="custom-background relative">
        <div className="blurry-circle absolute h-[450px]" />
        <div className="blurry-circle absolute h-[450px]" />
        <p className="p-wrapper">
          Explore Books <br />& Support local Authors
        </p>
        <div className="button-wrapper">
          <button
            onClick={handleSignup}
            className="custom-button hover:scale-105 rounded-xl border-white text-white bg-blue-500"
          >
            Sign Up
          </button>
        </div>
      </div>

      <section className="custom-grid-layout py-16">
        <div className="">
          <h1 className="text-[30px] text-center mb-10">
            Why Choose Handbook?
          </h1>
          <ul>
            <li className="my-3 text-[18px] ml-3">
              {`At Handbook, we're committed to supporting local
              businesses and authors.`}
            </li>
            <li className="my-3 text-[18px] ml-3">
              <strong>Empowering Local Authors:</strong>
              <p>
                {`
                Discover the hidden gems in our collection! We're all about
                championing the incredible talent right in our backyard. Dive
                into captivating stories, heartfelt prose, and imaginative tales
                penned by the creative minds in our local community. With every
                page turned, you're not just exploring a book but supporting the
                vibrant voices of our neighborhood wordsmiths.`}
              </p>
            </li>
            <li className="my-3 text-[18px] ml-3">
              <strong>Curated Selection and Community Focus:</strong>
              <p>
                Join our literary treasure hunt! Explore a carefully curated
                library featuring handpicked books from our local wordsmiths,
                along with those rare finds you will not stumble upon elsewhere.
                But wait, there is more! This is not just a marketplace; it is a
                cozy nook where book lovers and local authors unite. Share
                thoughts, make new friends, and celebrate the magic of
                storytelling together!
              </p>
            </li>
            <li className="my-3 text-[18px] ml-3">
              <strong>Community Focused:</strong> Connect with fellow readers
              and local authors.
            </li>
          </ul>

          <div className="flex-grow"></div>
        </div>
        <img src="../images/photo2.avif" />
      </section>

      <div className="grid-container bg-slate-500 pb-10">
        <div className="company ml-5">
          <h1 className="text-yellow-400 text-[20px] underline">Company</h1>
          <ul className="text-white">
            <li className="cursor-pointer py-1 hover:text-black">About Us</li>
            <li className="cursor-pointer py-1 hover:text-black">
              Our Services
            </li>
            <li className="cursor-pointer py-1 hover:text-black">
              Privacy Policy
            </li>
          </ul>
        </div>
        <div className="get-help ml-5">
          <h1 className="text-yellow-400 text-[20px] underline">Get Help</h1>
          <ul className="text-white">
            <li className="cursor-pointer py-1 hover:text-black">FAQ</li>
            <li className="cursor-pointer py-1 hover:text-black">Shipping</li>
            <li className="cursor-pointer py-1 hover:text-black">Returns</li>
            <li className="cursor-pointer py-1 hover:text-black">
              Order Status
            </li>
            <li className="cursor-pointer py-1 hover:text-black">
              Payment Option
            </li>
          </ul>
        </div>
        <div className="follow-us ml-5">
          <h1 className="text-yellow-400 text-[20px] underline">Follow Us</h1>
          <ul className="text-white">
            <li className="cursor-pointer py-1 hover:text-black">
              <FontAwesomeIcon icon={faSquareFacebook} />
            </li>
            <li className="cursor-pointer py-1 hover:text-black">
              <FontAwesomeIcon icon={faSquareInstagram} />
            </li>
            <li className="cursor-pointer py-1 hover:text-black">
              <FontAwesomeIcon icon={faXTwitter} />
            </li>
            <li className="cursor-pointer py-1 hover:text-black">
              <FontAwesomeIcon icon={faLinkedin} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
