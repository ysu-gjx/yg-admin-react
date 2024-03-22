import styles from './index.module.scss'
const Welcome = () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.subTitle}>欢迎体验</div>
        <div className={styles.title}>React通用后台管理系统</div>
        <div className={styles.desc}>React18+ReactRouter6.0+AntD5.4+TypeScript5.0+Vite实现通用后台</div>
      </div>
      <div className={styles.img}></div>
    </div>
  )
}

export default Welcome
