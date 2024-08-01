import "./style.scss";
import path from 'path';
import fs from 'fs';


import { notFound } from "next/navigation";
import PageArea from "@/Components/StaticPagesComponents/PageArea/PageArea";
import TwoColBox from "@/Components/StaticPagesComponents/TwoCol/TwoCol";
import SideControlls from "@/SmComponetns/SideControlls";
import ShareDialog from "@/SmComponetns/ShareDialog";
import GirdBoxes from "@/Components/StaticPagesComponents/CardsBox/CardsBox";
import Faq from "@/Components/StaticPagesComponents/Faq/Faq";
import Documents from "@/Components/StaticPagesComponents/DocumentsBox/DocumetsBox";
import GridPoints from "@/Components/GridPoints/GridPoints";
import Pricing from "@/Components/StaticPagesComponents/Pricing/Pricing";
import BannerAd from "@/Components/StaticPagesComponents/BannerAd/BannerAd";
import CallBackDialog from "@/Components/CallBackDialog/CallBackDialog";
import CallBackCard from "@/SmComponetns/CallbackCard/CallBackCard";
import QuickSummery from "@/SmComponetns/QuickSummery";
import HoverBarFixed from "@/SmComponetns/HoverBarFixed";
import MobileBottomBar from "@/SmComponetns/MobileBottomBar/MobileBottomBar";




export async function getPageData(pageID) {
  try {
    const filePath = path.join(process.cwd(), 'static_content', 'pages', `pg_${pageID}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const pageData = JSON.parse(fileContents);

    return pageData;
  } catch (error) {
      return null
  }
}



export async function generateMetadata({ params,searchParams }) {
  const id = searchParams.id;
  let meta_info_obj;
  const url = ""; 
  const logoUrl = "/assets/svg/logo.svg";
  const siteName = "sellersuccess.in";
  const pType = "Article";
  const twHandle = "@sellersuccess_IN";
  const autherName = "Sahil Joshi"



  try {
    const filePath = path.join(process.cwd(), 'static_content', 'pages', `pg_${id}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const pageData = JSON.parse(fileContents);
    if (pageData?.mata_info?.seo) {
      const title = pageData?.mata_info?.seo.title;
      const description = pageData?.mata_info?.seo.description;
      const image = pageData?.mata_info?.page_img || ""; 
      const datePublished = pageData?.mata_info?.date_publish || ""; 

      meta_info_obj = {
        title: title,
        description: description,
        keywords: pageData?.mata_info?.seo?.keywords,
        robots: {
          index: true,
          follow: true,
          nocache: true,
          googleBot: {
            index: true,
            follow: true,
          },
        },
        canonical: url,
        openGraph: {
          title: title,
          description: description,
          url: url,
          siteName: siteName,
          locale: 'en_US',
          type: pType.toLocaleLowerCase(),
          image: image,
        },
        twitter: {
          card: 'summary_large_image',
          site: twHandle,
          title: title,
          description: description,
          image: image,
        },
        jsonLd: {
          "@context": "https://schema.org",
          "@type": pType,
          "headline": title,
          "description": description,
          "url": url,
          "image": image,
          "author": {
            "@type": "Person",
            "name": autherName
          },
          "publisher": {
            "@type": "Organization",
            "name": siteName,
            "logo": {
              "@type": "ImageObject",
              "url": logoUrl
            }
          },
          "datePublished": datePublished,
          "dateModified": datePublished
        }
      };
    } else {
      meta_info_obj = {
        title: "Not Found",
        description: "Page Not Found!",
        jsonLd: {}
      };
    }
  } catch {
    meta_info_obj = {
      title: "Not Found",
      description: "Page Not Found!",
      jsonLd: {}
    };
  }

  return meta_info_obj;
}




const page = async ({searchParams}) => {

  const PAGE_DATA = await getPageData(searchParams.id);

  if(!PAGE_DATA){
    notFound();
  }

  return (
    <>
      <ShareDialog />
      <CallBackDialog/>
      <section className="static_page ">
        <BannerAd/>
        <HoverBarFixed/>
        <div className="grid_wrapper">
          <div className="left_row">
            <QuickSummery SUMMARY_TEXT={PAGE_DATA?.mata_info?.quick_summary} />
            <div className="sticky_card">
              <CallBackCard/>
            </div>
          </div>
          <div className="center">
            <PageArea META_INFO={PAGE_DATA?.mata_info} CONTENT={PAGE_DATA?.content} />
            {
            PAGE_DATA?.settings?.isFAQ.state &&
             <Faq  CONFIG={PAGE_DATA?.settings?.isFAQ} cls_n={"onDesktop"}/>
            }
          </div>
          <div className="right_row">
            <div className="controlls">
              <SideControlls />
            </div>
          </div>
        </div>
     
        <section className="fw_elements">
            {
              PAGE_DATA?.settings?.isGridPints?.state &&
              <GridPoints  CONFIG={PAGE_DATA?.settings?.isGridPints} />
            }
            {
              PAGE_DATA?.settings?.isTwoCol?.state &&
              <TwoColBox CONFIG={PAGE_DATA?.settings?.isTwoCol} />
            }
            {
                PAGE_DATA?.settings?.isnCol?.state &&
                <GirdBoxes CONFIG={PAGE_DATA?.settings?.isnCol}/> 
            }
            {
              PAGE_DATA?.settings?.isDocuments?.state &&
              <Documents CONFIG={PAGE_DATA?.settings?.isDocuments} />
            }
           
            <Faq cls_n={"onMobile"}  />
            {
               PAGE_DATA?.settings?.isPricing?.state &&
               <Pricing CONFIG={PAGE_DATA?.settings?.isPricing}/>
            }
         
        </section>
        <MobileBottomBar/>
      </section>
    </>
  );
};

export default page;
