import styles from './index.module.scss'

const NavFooter = () => {
  return (
    <div className={styles.footer}>
      <div>
        <a href='https://github.com/ysu-gjx/yg-admin-react' target='_blank' rel='noreferrer'>
          yg github主页
        </a>
        <span className='gutter'>|</span>
        <span> 2024 © React-Manager By YG.</span>
      </div>
    </div>
  )
}

export default NavFooter
