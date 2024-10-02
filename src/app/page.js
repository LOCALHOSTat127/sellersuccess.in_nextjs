import Hero from "@/Components/Hero/Hero";
import PopularServices from "@/Components/PopularServices/PopularServices";
import OurStory from "@/Components/OurStory/OurStory";
import RecentBlogs from "@/Components/RecentBlogs/RecentBlogs";
import GridPoints from "@/Components/GridPoints/GridPoints";
import Faq from "@/Components/StaticPagesComponents/Faq/Faq";
import OtherSerivicesLayout from "@/Components/OtherServicesLayout/OtherServicesLayout";

const TEXT_CONFIG = {
  state: true,
  isBG: true,
  head: "Why choose sellersuccess over anybody?",
  sub_head:
    "Expertise, personalized service, comprehensive solutions, and exceptional support. Trust us for peace of mind and value for money.",
  list: [
    {
      index: 1,
      head: "Industry Expertise",
      subhead:
        "Our team comprises seasoned professionals with years of experience in tax law, accounting principles, and financial management, ensuring accurate and reliable services.",
    },
    {
      index: 2,
      head: "Comprehensive Services",
      subhead:
        "From tax preparation and filing to bookkeeping, payroll management, and financial planning, we offer a full suite of services to cover all aspects of your financial needs.",
    },
    {
      index: 3,
      head: "Transparency",
      subhead:
        "We believe in transparent communication and pricing, providing clear explanations of our services and fees so that clients can make informed decisions about their finances.",
    },
    {
      index: 4,
      head: "Proven Track Record",
      subhead:
        "Apply for PAN and TAN for the partnership firm from the Income Tax Department. PAN is required for opening a bank account and for various tax-related purposes, while TAN is necessary for deducting and remitting taxes.",
    },
    {
      index: 5,
      head: "Continued Education",
      subhead:
        "We stay abreast of the latest developments in tax laws, regulations, and accounting practices, ensuring that our clients benefit from the most up-to-date expertise and insights.",
    },
    {
      index: 6,
      head: "Value for Money",
      subhead:
        "We offer exceptional value for money, delivering high-quality services at competitive rates. With our expertise and personalized approach, you can trust that every dollar spent with us will be an investment in your financial success.",
    },
  ],
};

const FAQS = {
  state: true,
  faqs: {
    left: [
      {
        question: "Who should file an ITR?",
        answer:
          "An individual whose annual income is more than the basic exemption limit of Rs 2.5 lakh should file an ITR. The basic exemption limit for senior citizens (60 years onwards and less than 80 years) is Rs 3 lakh, and for super senior citizens is Rs 5 lakh.",
      },
      {
        question: "How can I claim deductions for tax saving?",
        answer:
          "You should file an income tax return to claim tax deductions for tax savings such as ELSS, PPF, NSC investments and for payments such as housing loan repayments, insurance premium and donations.",
      },
      {
        question: "How do I check TDS details from my form 26AS?",
        answer:
          "You can check your Form 26AS from your e-filing login. ClearTax’s e-filing software auto-populates the TDS details from your Form 26AS in your income tax return.",
      },
      {
        question: "How can I claim an income tax refund?",
        answer:
          "You can claim an income tax refund by e-filing your income tax return. An e-filing enables you to claim credit for excess TDS paid and a tax refund.",
      },
      {
        question:
          "I receive my salary income after deduction of TDS. Am I required to file an income tax return?",
        answer:
          "You are required to file an income tax return once your annual income exceeds Rs 2.5 lakh. A deduction of TDS does not replace the requirement to file ITR. While e-filing your ITR, you should furnish the details of your annual income, claim deductions and credit for TDS deducted by your employer.",
      },
    ],
    right: [
      {
        question: "How to e-verify my ITR?",
        answer:
          "You can e-verify your ITR within 120 days from the date of filing. You can e-verify using your net banking account or Aadhaar based OTP. A failure to e-verify your ITR can invalidate your ITR filing.",
      },
      {
        question: "How to choose a suitable mutual fund for SIP?",
        answer:
          "You should not select a mutual fund for SIP only by considering the past performance of the fund and fund manager. To choose a suitable mutual fund, you also need to check if the fund’s investment objective is in line with your goals. You can also use our SIP calculator to estimate the return on your mutual fund investments.",
      },
      {
        question: "How does sellersuccess help small businesses?",
        answer:
          "You can create professional invoices and other business documents easily on mobile app or computer with ClearOne invoicing software. SMEs can also send invoices and payment reminders to customers through WhatsApp and Email with a click of a button..",
      },
      {
        question: "How can I claim deductions for tax saving?",
        answer:
          "You should file an income tax return to claim tax deductions for tax savings such as ELSS, PPF, NSC investments and for payments such as housing loan repayments, insurance premium and donations.",
      },
    ],
  },
};

const CONFIG_2 = {
  head: "Discover the Comprehensive Range of Services We Provide",
  subhead:
    "From essential registrations like GST, income tax, MSME, EIC, ESIC to acquiring specific tax numbers, we simplify the process for you.",
  cards: [
    {
      card_image: "assets/img/gst_black.png",
      card_title: "GST Cancellation",
      card_description:
        "Learn the process of applying for GST cancellation. This guide covers how to deregister or cancel your Goods and Services Tax (GST) registration due to reasons such as business closure, cessation of operations, or other circumstances that make you ineligible for GST.",
      card_link: "how-to-apply-for-gst-cancellation",
      id: "2024017",
    },
    {
      card_image: "assets/img/trademark_black.png",
      card_title: "Trademark/wordmrak Registration",
      card_description:
        "A Trademark registration protects your brand and provides you with the tools to prevent someone using similar signs and riding on the back of your business. Trademark (symbolizing a mark in trade) means a mark capable of being represented graphically and which is capable of distinguishing..",
      card_link:
        "how-to-apply-for-trademark-registration-a-comprehensive-overview",
      id: "2024051",
    },
    {
      card_image: "assets/img/export_black.png",
      card_title: "Import Export License Registration",
      card_description:
        "If a Private Limited Company wishes to engage in import or export activities, it is mandatory to obtain an IEC code. The code serves as a mandatory requirement for customs clearance for goods entering or leaving the country.",
      card_link: "how-to-obtain-an-iec-registration-for-import-and-export",
      id: "2024026",
    },
    {
      card_image: "assets/img/msme_black.png",
      card_title: "MSME/Udyog aadhar registration",
      card_description:
        "MSME registration beneficial for business at it provides a range of benefits such as eligibility for capital investment subsidies, lower rates of interest,  tax subsidies, power tariff subsidies, and other support. You may also avail our e-Xpress...",
      card_link: "how-to-apply-for-msme-registration",
      id: "2024023",
    },
    {
      card_image: "assets/img/digital_signature_black.png",
      card_title: "Digital Signature",
      card_description:
        "A Digital Signature certificate (DSC) is the equivalent of a physical signature in an electronic format, as it establishes the identity of the sender of an electronic document on the Internet. It comes in the form of a USB E-Token, wherein the Digital Signature Certificate is stored and can be...",
      card_link: "digital-signature-certificate-everything-you-need-to-know",
      id: "2024021",
    },
    {
      card_image: "assets/img/pancard_black.png",
      card_title: "Business PAN Card",
      card_description:
        "All you need to know Permanent Account Number (PAN) is a ten-digit alphanumeric number, for eg. AAAAA0000A, issued in the form of a laminated card, by the Indian Income Tax Department, to any “person” who applies for it or to whom the department allows the number without an application.",
      card_link: "how-to-apply-for-a-pan-card",
      id: "2024019",
    },
    {
      card_image: "assets/img/llp_name_change.png",
      card_title: "Changing an LLP Agreement",
      card_description:
        "A change in the Limited Liability Partnership (LLP) Agreement involves amending the existing agreement to reflect new terms or modifications agreed upon by the partners. The process typically includes drafting the amendment document, obtaining approval from all partners, and filing the amended agreement with the Registrar of Companies (ROC) if required. ",
      card_link: "how-to-make-changes-to-your-llp-agreement",
      id: "2024045",
    },
    {
      card_image: "assets/img/epf.png",
      card_title: "EPF Registration",
      card_description:
        "Learn about EPF (Employee Provident Fund) registration, a mandatory requirement for employers in India under the Employees’ Provident Funds and Miscellaneous Provisions Act, 1952. EPF aims to provide retirement benefits and social security to employees. Discover all you need to know about EPF registration here.",
      card_link: "epf-employee-provident-fund-registration",
      id: "2024022",
    },
    {
      card_image: "assets/img/authorised_capital.png",
      card_title: "Increase Authorized Capital",
      card_description:
        "Increasing the authorized capital of a company involves the process of raising the maximum amount of share capital that the company is allowed to issue. This process typically requires a board resolution, approval from shareholders, and filing the necessary forms with the Registrar of Companies (ROC). The increase in authorized capital is often undertaken to facilitate future growth, issue new shares, or meet business expansion requirements.",
      card_link: "how-to-increase-authorized-capital-for-a-company",
      id: "2024046",
    },
    {
      card_image: "assets/img/partnership_firm.png",
      card_title: "Register a Partnership Firm",
      card_description:
        "Learn the process to register a partnership firm. This business structure involves two or more individuals managing and operating a business based on a Partnership Deed. Understand the steps to set up a partnership firm, its advantages, and why it's popular among small and medium-sized businesses in the unorganized sectors.",
      card_link: "how-to-register-a-partnership-firm-a-step-by-step-guide",
      id: "2024007",
    },
  ],
};

const fetchFeaturedBlogs = async () => {
  let featuredBlogs = null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}api/blogs/recent_blogs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cache-controll": "no-cache",
        },
        body: JSON.stringify({ limit: 3 }),
      }
    );
    const res_ = await response.json();

    featuredBlogs = res_?.data;
  } catch (error) {
    console.log("Error While Fetching Featured Blog Posts!");
  }

  return featuredBlogs;
};

const HomePage = async () => {
  const blogs = await fetchFeaturedBlogs();

  return (
    <section className="home_page">
      <Hero />
      <PopularServices />
      <GridPoints marginBottom={"0px"} marginTop={"0px"} CONFIG={TEXT_CONFIG} />
      <OtherSerivicesLayout CONFIG={CONFIG_2} />
      <OurStory />
      <RecentBlogs cards_={blogs} />
      <div
        style={{
          maxWidth: "1224px",
          margin: "60px auto",
        }}
      >
        <Faq CONFIG={FAQS} />
      </div>
    </section>
  );
};

export default HomePage;
