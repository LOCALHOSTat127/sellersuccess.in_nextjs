"use client";
import "./style.scss";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/assets/svg/new_dektop_logo.svg";
import FbIcon from "../../../public/assets/svg/fb_svg.svg";
import IgIcon from "../../../public/assets/svg/instagram_svg.svg";
import LiIcon from "../../../public/assets/svg/linkedin_svg.svg";
import WbIcon from "../../../public/assets/svg/wb_blue.svg";
import ArrowBackIosSharp from "@mui/icons-material/ArrowBackIosSharp";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="first_floor">
          <div className="left">
            <Image src={Logo} alt="SellerSuccess.in" id="logo" />
            <p className="website_description">
              Elevate your financial journey with Seller Success: Your Marketplace for Seamless Accounting Solutions! Services Offered: Bookkeeping, GST Services, GST Registration, Private Limited company incorporation, Payroll Management.
            </p>
          </div>
          <div className="news_letter">
            <div className="form_box">
            <span>
              <h6>Subscribe to our Weekly Newsletter!</h6>
              <p>Get the latest updates in the world on GST & Income TAX!.</p>
            </span>
             <div className="outer">
             <div>
                <input type="text" placeholder="youremail@gmail.com" />
              </div>
              <button id="submit">
                Submit
                <ArrowBackIosSharp className="icon" />
              </button>
            </div>
             </div>
          </div>
        </div>
        <div className="third_floor">
          <div className="copy_right">
            <p className="cpr">© 2024 All rights reserved.</p>
          </div>
          <div className="alter_links">
            <ul>
              <Link href={"/payment-policy"}>
                <li className="link">Payment Policy</li>
              </Link>
              <Link href={"/privary-policy"}>
                <li className="link">Privacy Policy</li>
              </Link>
              <Link href={"/terms-and-conditions"}>
                <li className="link">Terms & Conditions</li>
              </Link>
            </ul>
          </div>
          <div className="social_links">
            <div>
              <a href="https://www.facebook.com/sellersuccess.india/" target="_blank" rel="noopener noreferrer">
              <Image src={FbIcon} alt="Facebook" /></a>
            </div>
            <div>
            <a href="https://wa.me/+917852099185?text=Hello" target="_blank" rel="noopener noreferrer">
              <Image src={WbIcon} alt="Web" />
              </a>
            </div>
           
            <div>
            <a href="https://www.instagram.com/sellersuccess.india/" target="_blank" rel="noopener noreferrer">
              <Image src={IgIcon} alt="Instagram" />
              </a>
            </div>
            <div>
            <a href="https://x.com/sellersuccessIN" target="_blank" rel="noopener noreferrer">
              <Image src={LiIcon} alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
