import { Helmet } from "react-helmet-async";

const SEO = (props) => {
  return (
    <Helmet>
      <title>{`${props.title} | Daily Goods`}</title>
      <meta name="description" content={props.description} />
      <meta name="author" content="Mochamad Boval" />
      <meta name="robots" content="index, follow" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="og:url"
        content={`https://dailygoods.vercel.app/${props.page}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${props.title} | Daily Goods`} />
      <meta property="og:description" content={props.description} />
      <meta
        property="og:image"
        content="https://dailygoods.vercel.app/daily-goods.png"
      />
      <meta property="og:image:alt" content={props.description} />
      <meta property="og:site_name" content="Daily Goods" />
      <meta property="og:locale" content="en_US" />
    </Helmet>
  );
};

export default SEO;
