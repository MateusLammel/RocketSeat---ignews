import styles from "./home.module.scss";
import Head from "../../node_modules/next/head";
import avatar from "../assets/avatar.svg";
import Image from "next/image";
import { GetStaticProps } from "next";
import { stripe } from "../services/stripe";
import { SubscribeButton } from "../components/SubscribeButton";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> Hey, welcome </span>
          <h1>
            News about the <span> React </span> world.
          </h1>
          <p>
            Get acess to all the publications <br />
            <span> for {product.amount} month</span>{" "}
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <Image src={avatar} alt="avatar" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1LDEoQAMu7RCyQiOBu0AL20k");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount! / 100),
  };
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};
