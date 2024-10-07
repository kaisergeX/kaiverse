import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Heading from '@theme/Heading'
import {Terminal} from '@kaiverse/k/ui'

import styles from './index.module.css'

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext()
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className="p-16 text-center">
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="btn btn-primary hover:no-underline hover:text-primary-content"
              to="/docs/intro"
            >
              Getting Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        <div className="container h-[40dvh] p-4">
          <Terminal title="Terminal" greeting="Welcome to Terminal UI Demo!" data-theme="dark" />
        </div>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
