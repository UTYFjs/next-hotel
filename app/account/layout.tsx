import SideNavigation from '../_components/SideNavigation'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
        <section className='grid grid-cols-[11rem_1fr] h-full gap-12'>
          <SideNavigation/>
          <div className=''>
          {children}
          </div>

        </section>

  )
}
