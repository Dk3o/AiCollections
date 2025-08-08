import styles from '../styles/components/Logo.module.scss';
import LogoLight from '../assets/Logo-light.svg';
import LogoDark from '../assets/Logo-dark.svg';

export default function Logo({ isDark }) {
  return (
    <div className={styles.logo}>
      <a href="/">
        <img src={isDark ? LogoLight : LogoDark} alt="Logo" />
      </a>
    </div>
  );
}
