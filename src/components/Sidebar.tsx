import Link from "next/link";
import { Activity, Calendar, LayoutDashboard, Settings, User } from "lucide-react";

export function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r bg-card min-h-screen flex-col p-4">
        <div className="flex items-center space-x-2 mb-8 px-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold tracking-tight">Recovery OS</span>
        </div>
        <nav className="flex-1 space-y-2">
          <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem href="/today" icon={<Calendar size={20} />} label="Today" />
          <NavItem href="/timeline" icon={<Activity size={20} />} label="Timeline" />
          <NavItem href="/profile" icon={<User size={20} />} label="Profile" />
        </nav>
        <div className="mt-auto">
          <NavItem href="/settings" icon={<Settings size={20} />} label="Settings" />
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t bg-card px-2 py-3 shadow-lg pb-4">
        <MobileNavItem href="/dashboard" icon={<LayoutDashboard size={24} />} label="Home" />
        <MobileNavItem href="/today" icon={<Calendar size={24} />} label="Today" />
        <MobileNavItem href="/timeline" icon={<Activity size={24} />} label="Timeline" />
        <MobileNavItem href="/profile" icon={<User size={24} />} label="Profile" />
      </nav>
    </>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function MobileNavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center space-y-1 text-muted-foreground hover:text-foreground"
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
