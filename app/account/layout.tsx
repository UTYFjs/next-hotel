import SideNavigation from '../_components/SideNavigation'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
        <section className='flex flex-col mt-3 sm:mt-0 ml-[-10px] sm:ml-0 sm:grid  sm:grid-cols-[11rem_1fr] sm:h-full sm:gap-12'>
          <SideNavigation/>
          <div className=''>
          {children}
          </div>

        </section>

  )
}
