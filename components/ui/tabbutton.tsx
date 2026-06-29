import { ChevronRight } from 'lucide-react';

type TabButtonProps = {
  label: string;
  value: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export default function TabButton({
  label,
  value,
  activeTab,
  onTabChange,
}: TabButtonProps) {
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => onTabChange(value)}
      className={`flex items-center
        relative px-4 py-2 rounded-full font-medium
        transition-colors duration-200
        cursor-pointer
        ${isActive ? "text-black" : "text-gray-500 hover:text-black"}
      `}
    >
 
      {label}
    </button>
  );
}