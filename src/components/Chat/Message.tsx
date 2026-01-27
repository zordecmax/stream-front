interface MessageItemProps {
    name: string;
    message: string;
    color: string;
}

export interface ChatMessages {
    name: string;
    message: string;
}

export const Message: React.FC<MessageItemProps> = ({
    name,
    message,
    color,
}) => (
    <div className='font-extrabold text-sm'><span className={color}>{name}</span>: {message}</div>
);