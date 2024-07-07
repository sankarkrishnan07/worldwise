import PageNav from "../components/common/PageNav";
import styles from "./Pricing.module.scss";

export default function Product() {
  return (
    <div className={styles.pricing}>
      <PageNav />
      <section className={styles.pricingContentWrap}>
        <div className={styles.pricingImg}>
          <img src="/img-1.jpg" alt="" />
        </div>
        <div className={styles.pricingContent}>
          <h2 className={styles.pricingTitle}>About WorldWide.</h2>
          <p className={styles.pricingPara}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            dicta illum vero culpa cum quaerat architecto sapiente eius non
            soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
            perspiciatis? Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Corporis doloribus libero sunt expedita ratione iusto, magni,
            id sapiente sequi officiis et.
          </p>
        </div>
      </section>
    </div>
  );
}
