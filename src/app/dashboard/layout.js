import Navbar from "../ui/dashboard/navbar/navbar"
import Sidebar from "../ui/dashboard/sidebar/sidebar"
import Footer from "../ui/dashboard/footer/footer";
import "@/app/ui/globals.css";
import styles from "@/app/ui/dashboard/dashboard.module.css"


const layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div>
        <Sidebar/>
      </div>
      <div className={styles.content}>
        <Navbar/>
        { children }
        <Footer />
      </div>
    </div>
  )
}

export default layout
