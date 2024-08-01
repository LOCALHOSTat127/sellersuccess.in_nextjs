import "./style.scss";
import Image from "next/image";
import ArrowBlue from "../../../public/assets/svg/arrow_right_blue_sm.svg";

import GstIcon from "../../../public/assets/img/gst_sm.png";
import AccountsIcon from "../../../public/assets/img/accounting_sm.png";
import ComplianceIcon from "../../../public/assets/img/compliances_sm.png";
import IncomeTaxIcon from "../../../public/assets/img/incometax_sm.png";
import Link from "next/link";
import { truncateText } from "../../../lib/commons";

const service_cards_one = [
  {
    title: "GST Return",
    description:
      "Understand GST returns and their importance in compliance with GST law. Learn what GST returns are, why they are required, and how to file them properly to meet tax obligations.",
    link: {
      text: "Learn more",
      icon: ArrowBlue,
      href: "gst-returns-everything-you-need-to-know",
      id: "2024018",
    },
    image: GstIcon,
    imageAlt: "Goods & Service Tax Returns",
  },
  {
    title: "Virtual CFO",
    description:
      "A Virtual CFO (Chief Financial Officer) service provides businesses with expert financial guidance and strategic leadership without the need for a full-time, in-house CFO. This service includes financial planning, budgeting, forecasting, cash flow management, financial reporting, and strategic advice. Ideal for small to medium-sized enterprises, a Virtual CFO helps optimize financial performance, support business growth, and ensure compliance with regulatory requirements.",
    link: {
      text: "Learn more",
      icon: ArrowBlue,
      href: "virtual-cfo-service-strategic-financial-leadership-for-your-business",
      id: "2024055",
    },
    image: AccountsIcon,
    imageAlt: "Virtual CFO",
  },
  {
    title: "Private Limited Company",
    description:
      "Discover the key features of a Private Limited Company. In India, this business structure sits between a partnership firm and a public company. Learn about its registration process, minimum requirements, and the roles of directors and shareholders. Understand why a Private Limited Company is a popular choice for many businesses.",
    link: {
      text: "Learn more",
      icon: ArrowBlue,
      href: "private-limited-company-essential-features-and-benefits",
      id: "2024004",
    },
    image: ComplianceIcon,
    imageAlt: "Private Limited Company Registration",
  },
  {
    title: "ITR Filling",
    description:
      "An Income Tax Return (ITR) is a form filed by individuals, businesses, or other entities with the tax authorities, declaring their income, deductions, and taxes payable for a particular financial year.",
    link: {
      text: "Learn more",
      icon: ArrowBlue,
      href: "everything-you-need-to-know-about-income-tax-filing",
      id: "2024027",
    },
    image: IncomeTaxIcon,
    imageAlt: "ITR Filling",
  },
];

const extra_services = [
  {
    title: "E-Commerce Business",
    description:
      "Discover how to start an e-commerce business with a detailed overview of key aspects such as market research, product selection, platform choice, marketing strategies, logistics, and legal considerations. Get step-by-step guidance to launch and grow your online retail venture successfully.",
    link: {
      text: "Learn more",
      icon: ArrowBlue,
      href: "how-to-start-an-e-commerce-business-a-comprehensive-guide",
      id: "2024008",
    },

    imageAlt: "E-Commerce Business",
  },
  {
    title: "MSME Registration",
    description:
      "Learn how to apply for MSME (Micro, Small, and Medium Enterprises) registration, which has replaced the old SSI (Small Scale Industries) registration in India. Discover the process and key details about MSME registration here.",
    link: {
      text: "Learn more",
      icon: ArrowBlue,
      href: "how-to-apply-for-msme-registration",
      id: "2024023",
    },

    imageAlt: "MSME Registration",
  },
  {
    title: "TDS Return",
    description:
      "file a TDS (Tax Deducted at Source) return with our step-by-step guide. A TDS return is a statement detailing tax deducted at source by the deductor during a specific period, including information on the deductor’s and deductee’s PAN, the amount of TDS deducted, the nature of payment, and other relevant details.",
    link: {
      text: "Learn more",
      icon: ArrowBlue,
      href: "how-to-file-a-tds-return",
      id: "2024018",
    },

    imageAlt: "TDS Return",
  },
  {
    title: "Surrender DIN",
    description:
      "Surrendering a Director Identification Number (DIN) involves formally relinquishing the DIN that was previously assigned to a director. This process typically includes submitting a request to the Registrar of Companies (ROC) along with necessary documentation such as a declaration stating that the DIN is no longer required and that the director has ceased to be associated with any company. The surrender of DIN is generally done when a director resigns or is removed from their position.",
    link: {
      text: "Learn more",
      icon: ArrowBlue,
      href: "how-to-surrender-director-identification-number-din",
      id: "2024047",
    },
    imageAlt: "Surrender DIN",
  }
];

export const ArticleCards = ({ extraServices }) => (
  <>
    {extraServices?.map((service, index) => (
      <Link key={index} href={`/article/${service.link.href}?id=${service.link.id}`}>
        <div  className="article-card">
          <div className="article-content">
            <h2>{service.title}</h2>
            <p className="article-meta"></p>
            <p>{truncateText(service.description, 80)}</p>
          </div>
        </div>
      </Link>
    ))}
  </>
);

export const ServiceSection = ({ cards_, title_, desc_, isSwitch, img_ }) => {
  return (
    <div className={`inner_wrapper ${isSwitch && "switch"}`}>
      <div
        className="setion_banner"
        style={{
          backgroundImage: `url(${img_})`,
        }}
      >
        <div className="banner_content">
          <h5 className="banner_head">{title_}</h5>
          <p className="banner_desc">{desc_}</p>
        </div>
      </div>
      <div className="services">
        {cards_.map((card, index) => (
          <div className="card" key={index}>
            <Image
              className="service_img"
              src={card.image}
              alt={card.imageAlt}
            />
            <h3 className="card_title">{card.title}</h3>
            <p className="card_desc">{truncateText(card.description, 80)}</p>
            <Link href={`/article/${card.link.href}?id=${card.link.id}`}>
              <p className="link">
                {card.link.text}
                <Image
                  className="sm_arrow"
                  src={card.link.icon}
                  alt="learn more"
                />
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const PopularServices = () => {
  return (
    <section id="popular_serivces_section" className="services_grid">
      <div className="wrapper">
        <div className="text_section">
          <h4>Services Tailored to Your Needs.</h4>
          <p>
            Explore our expert services: ITR filing, GST registration,
            bookkeeping, payroll, and financial planning. Simplify your finances
            with us.
          </p>
        </div>
        <ServiceSection
          cards_={service_cards_one}
          title_={"Most Requested Services."}
          img_={"/assets/img/2.jpg"}
          desc_={
            "Learn about the services that are making a difference for our clients and could do the same for you."
          }
          isSwitch={false}
        />
        <div className="bottom_services_extras">
          <div>
            <ArticleCards extraServices={extra_services} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
