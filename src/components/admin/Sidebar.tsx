import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/icons/Logo.png';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  ClipboardList, 
  Users, 
  Settings, 
  UserCircle, 
  Shield, 
  Key, 
  Tag, 
  Truck, 
  MessageSquare, 
  Mail, 
  Calendar, 
  PenTool as Tool,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface SidebarLink {
  icon: React.ElementType;
  label: string;
  path: string;
  hasSubmenu?: boolean;
  submenu?: SidebarLink[];
}

const sidebarLinks: SidebarLink[] = [
  { 
    icon: LayoutDashboard, 
    label: 'Dashboard', 
    path: '/admin' 
  },
  { 
    icon: Package, 
    label: 'Products', 
    path: '/admin/products',
    hasSubmenu: true,
    submenu: [
      { icon: Package, label: 'List', path: '/admin/products' },
      { icon: Package, label: 'Create', path: '/admin/products/create' }
    ]
  },
  { 
    icon: FolderTree, 
    label: 'Category', 
    path: '/admin/categories',
    hasSubmenu: true 
  },
  { 
    icon: ClipboardList, 
    label: 'Orders', 
    path: '/admin/orders',
    hasSubmenu: true 
  },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
  { icon: UserCircle, label: 'Profile', path: '/admin/profile' },
  { 
    icon: Shield, 
    label: 'Roles', 
    path: '/admin/roles',
    hasSubmenu: true 
  },
  { icon: Key, label: 'Permissions', path: '/admin/permissions' },
  { icon: Users, label: 'Customers', path: '/admin/customers' },
  { 
    icon: Truck, 
    label: 'Vendors', 
    path: '/admin/vendors',
    hasSubmenu: true 
  },
  { 
    icon: Tag, 
    label: 'Coupons', 
    path: '/admin/coupons',
    hasSubmenu: true 
  },
  { icon: MessageSquare, label: 'Reviews', path: '/admin/reviews' },
  { icon: Mail, label: 'Email', path: '/admin/email' },
  { icon: Calendar, label: 'Calendar', path: '/admin/calendar' },
  { icon: Tool, label: 'Tools', path: '/admin/tools' }
];

export const Sidebar = () => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

  const isLinkActive = (link: SidebarLink) => {
    if (link.path === location.pathname) return true;
    if (link.submenu) {
      return link.submenu.some(sub => sub.path === location.pathname);
    }
    return false;
  };

  return (
    <aside className="w-64 bg-[#1F2937] text-white h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <Link to="/" className="flex items-center space-x-2">
          <img src={Logo} alt="Vivian's Store" className="h-10" />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-gray-400 hover:text-white cursor-pointer">
              <span className="text-sm font-medium">GENERAL</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="mt-2 space-y-1">
              {sidebarLinks.map((link) => {
                const isActive = isLinkActive(link);
                const isSubmenuOpen = openSubmenu === link.path;

                return (
                  <div key={link.path}>
                    <Link
                      to={link.path}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                      }`}
                      onClick={(e) => {
                        if (link.hasSubmenu) {
                          e.preventDefault();
                          setOpenSubmenu(isSubmenuOpen ? null : link.path);
                        }
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <link.icon className="h-5 w-5" />
                        <span>{link.label}</span>
                      </div>
                      {link.hasSubmenu && (
                        <ChevronRight className={`h-4 w-4 transition-transform ${
                          isSubmenuOpen ? 'rotate-90' : ''
                        }`} />
                      )}
                    </Link>

                    {link.hasSubmenu && isSubmenuOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.submenu?.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`flex items-center space-x-3 p-3 rounded-lg ${
                              location.pathname === subItem.path
                                ? 'bg-blue-600'
                                : 'hover:bg-gray-700'
                            }`}
                          >
                            <subItem.icon className="h-5 w-5" />
                            <span>{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};