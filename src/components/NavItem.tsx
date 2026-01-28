import Link from 'next/link';

interface NavItemProps {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, active, onClick }) => {
  return (
    <Link href={href} className={`text-secondary font-medium hover:text-white transition-colors ${active ? 'text-white' : ''}`} onClick={onClick}>
      {label}
    </Link>
  );
};

export default NavItem;