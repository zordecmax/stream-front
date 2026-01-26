import Link from 'next/link';

interface NavItemProps {
  href: string;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, active }) => {
  return (
    <Link href={href} className={`text-gray-400 font-medium hover:text-white transition-colors ${active ? 'text-white' : ''}`}>
      {label}
    </Link>
  );
};

export default NavItem;