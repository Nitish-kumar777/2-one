import styles from "./transactions.module.css";

const Transactions = () => {
  const Team = [
    {
      name: "Nitish",
      status: "Developer",
      image: "https://res.cloudinary.com/dafjjvcsh/image/upload/v1731441716/Image/ntgeglfnfbl1we5xecjh.jpg",
      date: "14.08.2024",
      amount: "$10000",
    },
    {
      name: "Creative",
      status: "Founder & Developer",
      image: "/image1.png",
      date: "14.08.2024",
      amount: "$10000",
    },
    {
      name: "Nitish",
      status: "Founder & Uploader",
      image: "https://res.cloudinary.com/dafjjvcsh/image/upload/v1731441715/Image/v6xhqmy3zugboot1k1tr.jpg",
      date: "14.08.2024",
      amount: "$10000",
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Team Members</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          {Team.map((member, index) => (
            <tr key={index}>
              <td>
                <div className={styles.user}>
                  <img
                    src={member.image}
                    alt={member.name}
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {member.name}
                </div>
              </td>
              <td>
                <span className={`${styles.status} ${styles.done}`}>
                  {member.status}
                </span>
              </td>
              <td>{member.date}</td>
              <td>{member.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
