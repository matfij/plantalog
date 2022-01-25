import PlantForm from '../lib/PlantForm';
import SearchForm from '../lib/SearchForm';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <main className={styles.main}>      
      <div className={styles.card}>
        <h1>Add a new Plant</h1>
        <PlantForm />
      </div>

      <div className={styles.card}>
        <h1>Search by vitamins</h1>
        <SearchForm />
      </div>
    </main>
  )
}
