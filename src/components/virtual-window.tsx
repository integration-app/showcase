export const VIRTUAL_WINDOW_ID = 'virtual-window';

export function VirtualWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full h-full rounded-lg shadow-xl border border-gray-300 overflow-hidden'>
      <div className='flex items-center h-[var(--frame-window-header-height)] bg-gray-200 rounded-t-lg px-3 border-b border-gray-300'>
        <div className='flex space-x-2'>
          <div className='w-3 h-3 bg-red-500 rounded-full'></div>
          <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
          <div className='w-3 h-3 bg-green-500 rounded-full'></div>
        </div>
      </div>
      <div className='overflow-hidden h-full relative' id={VIRTUAL_WINDOW_ID}>
        {children}
      </div>
    </div>
  );
}
