import styles from "@/app/ui/dashboard/dashboard.module.css";
import Transactions from "@/app/ui/dashboard/transactions/transactions"


const Dashboard = () => {


  return (
    <>
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div  className={styles.cards}>
        </div>
        <Transactions />
        </div>
    </div>
    </>
  )
}

export default Dashboard
