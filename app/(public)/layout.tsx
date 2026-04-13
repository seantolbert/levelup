import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getContent } from '@/lib/content'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent()
  return (
    <>
      <Navbar
        businessName={content.siteSettings.businessName}
        phone={content.siteSettings.phone}
      />
      <main>{children}</main>
      <Footer
        content={content.siteSettings}
        businessName={content.siteSettings.businessName}
      />
    </>
  )
}
