import { Outlet } from 'react-router'

export function Sidebar() {
  return (
    // <aside className="sticky top-0 z-10 w-64 shrink-0 overflow-y-auto">
    // {/* <div className="flex h-full flex-col py-4"> */}
    <div className="flex h-150 basis-124 flex-col overflow-y-auto">
      <Outlet />
    </div>
    // </aside>
  )
}
