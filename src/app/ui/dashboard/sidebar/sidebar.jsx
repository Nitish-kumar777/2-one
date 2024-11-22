"use client";

import { MenuLink } from "./menuLink";
import styles from "./sidebar.module.css";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaUpload } from "react-icons/fa";
import { IoMdMenu, IoMdClose } from "react-icons/io"; // Icons for open/close toggle

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Anime Upload",
        path: "/dashboard/animeuplod",
        icon: <FaUpload />,
      },
    ],
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/check-auth');
      if (!res.ok) {
        router.push('/Adminlogin');
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Toggle button for opening/closing sidebar on smaller screens */}
      <button onClick={toggleSidebar} className={`${styles.toggleButton} ${isOpen ? styles.closeButton : styles.openButton}`}>
        {isOpen ? <IoMdClose /> : <IoMdMenu />}
      </button>

      {/* Sidebar */}
      <div className={`${styles.container} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.user}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCR3kZLWPwovzJzJdK_ndLT574PdjE_a5eRw&s" alt="User" width={60} height={60} style={{ borderRadius: "80%", objectFit: "cover" }} />
          <div className={styles.userDetail}>
            <span className={styles.username}>Uploader</span>
            <span className={styles.userTitle}>Administrator</span>
          </div>
        </div>
        <ul className={styles.list}>
          {menuItems.map((cat) => (
            <li key={cat.title}>
              <span className={styles.cat}>{cat.title}</span>
              {cat.list.map(item => (
                <MenuLink item={item} key={item.title} />
              ))}
            </li>
          ))}
        </ul>
        <button onClick={handleLogout} className={styles.logout}>
          <MdLogout /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
