import PageNav from "../components/common/PageNav";
import styles from './Pricing.module.scss'

export default function Pricing() {
  return (
    <div className={styles.pricing}>
      <PageNav />
      <section className={styles.pricingContentWrap}>
        <div className={styles.pricingContent}>
        <h2 className={styles.pricingTitle}>Simple pricing. <br /> Just $9/month.</h2>
      <p className={styles.pricingPara}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
        labore mollitia iusto. Recusandae quos provident, laboriosam fugit
        voluptatem iste.
      </p>
        </div>
        <div className={styles.pricingImg}>
            <img src="/img-2.jpg" alt="" />
        </div>
      </section>
    </div>
  );
}
