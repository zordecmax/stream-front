import { useLayout } from "@/context/LayoutContext";

interface StreamerItemProps {
    avatar: string;
    name: string;
    game: string;
    viewers: number;
    isLive: boolean;
}

export interface StreamerItems {
    name: string;
    game: string;
    viewers: number;
}

const StreamerItem: React.FC<StreamerItemProps> = ({
    avatar,
    name,
    game,
    viewers,
    isLive,
}) => {
    const { leftSidebarCollapsed } = useLayout();
    return (
        <div className='flex gap-2 items-center'>
            <img src={avatar} alt={name} className='w-fit object-cover aspect-square' />
            {!leftSidebarCollapsed &&
                <>
                    <div className='flex flex-col grow'>
                        <h4 className='font-semibold'>{name}</h4>
                        <span className='font-medium text-muted text-sm'>{game}</span>
                    </div>
                    {isLive && <span className="w-2 h-2 bg-accent rounded-full"></span>}
                    <span className='text-sm font-semibold'>{viewers}</span>
                </>
            }
        </div>
    );
};
export default StreamerItem;