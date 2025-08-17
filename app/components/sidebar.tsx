import { Outlet } from 'react-router'

// ----------------------------------------------------------------------

export function Sidebar() {
  return (
    <aside className="bg-zinc-50 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-md lg:items-start lg:overflow-y-auto xl:w-120">
      <div className="relative z-10 mx-auto h-150 px-4 pt-10 pb-4 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-r lg:border-zinc-200 lg:px-8 lg:py-12 xl:px-12">
        <Outlet />
      </div>
    </aside>
  )
}
